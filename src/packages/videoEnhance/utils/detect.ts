import * as tf from '@tensorflow/tfjs';
import {DetectOptions, DetectResult} from './types';

/**
 * Preprocess image / frame before forwarded into the model
 * @param {HTMLVideoElement|HTMLImageElement} source
 * @param {Number} modelWidth
 * @param {Number} modelHeight
 * @returns input tensor, xRatio and yRatio
 */
const preprocess = (source: ImageBitmap, modelHeight: number, modelWidth: number) => {
  const img = tf.browser.fromPixels(source);
  const [h, w] = img.shape.slice(0, 2); // get source width and height

  // Check if aspect ratios are the same
  const sourceRatio = w / h;
  const modelRatio = modelWidth / modelHeight;

  const input = tf.tidy(() => {
    if (Math.abs(sourceRatio - modelRatio) < 0.01) {
      // If aspect ratios match, directly resize without padding
      return tf.image.resizeBilinear(img, [modelHeight, modelWidth]).div(255.0).expandDims(0);
    }

    // Original padding logic for different aspect ratios
    const maxSize = Math.max(w, h);
    const imgPadded = img.pad([
      [0, maxSize - h], // padding y [bottom only]
      [0, maxSize - w], // padding x [right only]
      [0, 0],
    ]);

    return tf.image
      .resizeBilinear(imgPadded as tf.Tensor3D, [modelHeight, modelWidth])
      .div(255.0)
      .expandDims(0);
  });

  // Calculate ratios based on whether padding was applied
  const xRatio = Math.abs(sourceRatio - modelRatio) < 0.01 ? w / modelWidth : Math.max(w, h) / modelWidth;
  const yRatio = Math.abs(sourceRatio - modelRatio) < 0.01 ? h / modelHeight : Math.max(w, h) / modelHeight;

  return [input, xRatio, yRatio] as const;
};

// Function to convert model coordinates to original image coordinates
export const convertModelCoordsToOriginal = ([x, y]: [number, number], [xRatio, yRatio]: [number, number]) => {
  const originalX = x * xRatio;
  const originalY = y * yRatio;
  return [originalX, originalY];
};

/**
 * Function run inference and do detection from source.
 * @param {ImageBitmap} source
 * @param {IModel} model loaded YOLOv8 tensorflow.js model
 * @param {VoidFunction} callback function to run after detection process
 */
export const detect = async (
  source: ImageBitmap,
  model: {net: tf.GraphModel; inputShape: number[]; labels: string[]},
  {scoreThreshold = 0.5}: DetectOptions,
) => {
  const {net, inputShape, labels} = model;

  const tfModel = net;
  const [modelHeight, modelWidth] = inputShape.slice(1, 3); // get model width and height

  tf.engine().startScope(); // start scoping tf engine
  const [input, xRatio, yRatio] = preprocess(source, modelHeight, modelWidth); // preprocess image

  const res = tfModel!.execute(input) as tf.Tensor<tf.Rank>; // inference model
  const transRes = res.transpose([0, 2, 1]); // transpose result [b, det, n] => [b, n, det]
  const boxes: tf.Tensor2D = tf.tidy(() => {
    const w = transRes.slice([0, 0, 2], [-1, -1, 1]); // get width
    const h = transRes.slice([0, 0, 3], [-1, -1, 1]); // get height
    const x1 = tf.sub(transRes.slice([0, 0, 0], [-1, -1, 1]), tf.div(w, 2)); // x1
    const y1 = tf.sub(transRes.slice([0, 0, 1], [-1, -1, 1]), tf.div(h, 2)); // y1
    return tf
      .concat(
        [
          y1,
          x1,
          tf.add(y1, h), // y2
          tf.add(x1, w), // x2
        ],
        2,
      )
      .squeeze() as tf.Tensor2D;
  }); // process boxes [y1, x1, y2, x2]

  const numClass = labels.length;
  const [scores, classes]: [tf.Tensor1D, tf.Tensor1D] = tf.tidy(() => {
    // class scores
    // #6 only squeeze axis 0 to handle only 1 class models
    const rawScores = transRes.slice([0, 0, 4], [-1, -1, numClass]).squeeze([0]);
    return [rawScores.max(1), rawScores.argMax(1)];
  }); // get max scores and classes index

  const nms = await tf.image.nonMaxSuppressionAsync(boxes, scores, 500, 0.45, 0.2); // NMS to filter boxes

  const boxesData = boxes.gather(nms, 0).dataSync(); // indexing boxes by nms index
  const scoresData = scores.gather(nms, 0).dataSync(); // indexing scores by nms index
  const classesData = classes.gather(nms, 0).dataSync(); // indexing classes by nms index
  const result: DetectResult = {
    boxes: Array.from(boxesData),
    labels: Array.from(classesData).map((c) => labels[c]),
    scores: Array.from(scoresData),
    modelSize: [modelHeight, modelWidth],
    ratios: [xRatio, yRatio],
    classes: Array.from(classesData),
  };
  tf.dispose([res, transRes, boxes, scores, classes, nms]); // clear memory

  tf.engine().endScope(); // end of scoping

  return filterResult(result, scoreThreshold);
};

export const filterResult = (result: DetectResult, scoreThreshold: number): DetectResult => {
  const filteredBoxes = [];
  const filteredLabels = [];
  const filteredScores = [];
  const filteredClasses = [];
  for (let i = 0; i < result.scores.length; i++) {
    if (result.scores[i] > scoreThreshold) {
      const currentBox = result.boxes.slice(i * 4, (i + 1) * 4);
      filteredBoxes.push(...currentBox);
      filteredLabels.push(result.labels[i]);
      filteredScores.push(result.scores[i]);
      filteredClasses.push(result.classes[i]);
    }
  }
  return {...result, boxes: filteredBoxes, labels: filteredLabels, scores: filteredScores, classes: filteredClasses};
};

export const testRun = async (model: {net: tf.GraphModel; inputShape: number[]; labels: string[]}) => {
  const {net, inputShape} = model;
  const tfModel = net;
  const dummyInput = tf.ones(inputShape);
  const warmupResults = tfModel!.execute(dummyInput);
  tf.dispose([warmupResults, dummyInput]); // cleanup memory
  return true;
};
