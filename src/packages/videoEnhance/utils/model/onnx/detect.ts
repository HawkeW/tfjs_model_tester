import { DetectOptions } from "../../types";
import * as ort from 'onnxruntime-web';

const preprocess = (source: ImageBitmap, dims: number[]) => {
  // 1. Get buffer data from image and create R, G, and B arrays.
  var imageBufferData = source;
  const [redArray, greenArray, blueArray] = new Array(new Array<number>(), new Array<number>(), new Array<number>());

  // 2. Loop through the image buffer and extract the R, G, and B channels
  for (let i = 0; i < imageBufferData.length; i += 4) {
    redArray.push(imageBufferData[i]);
    greenArray.push(imageBufferData[i + 1]);
    blueArray.push(imageBufferData[i + 2]);
    // skip data[i + 3] to filter out the alpha channel
  }

  // 3. Concatenate RGB to transpose [224, 224, 3] -> [3, 224, 224] to a number array
  const transposedData = redArray.concat(greenArray).concat(blueArray);

  // 4. convert to float32
  let i, l = transposedData.length; // length, we need this for the loop
  // create the Float32Array size 3 * 224 * 224 for these dimensions output
  const float32Data = new Float32Array(dims[1] * dims[2] * dims[3]);
  for (i = 0; i < l; i++) {
    float32Data[i] = transposedData[i] / 255.0; // convert to float
  }
  // 5. create the tensor object from onnxruntime-web.
  const inputTensor = new ort.Tensor("float32", float32Data, dims);
  return inputTensor;
}

export const  detect = async (
  source: ImageBitmap,
  model: { net: any;},
  {
    scoreThreshold = 0.5 
  }: DetectOptions,
) => {
  const { net: session } = model;
   // Get start time to calculate inference time.
   const start = new Date();
   // create feeds with the input name from model export and the preprocessed data.
   const feeds: Record<string, ort.Tensor> = {};

   const preprocessedData = preprocess(source, session.inputMetadata[session.inputNames[0]].tensorShape.dims);

   // set the feeds with the input name and the preprocessed data from the previous step.
   feeds[session.inputNames[0]] = preprocessedData;
   // Run the session inference.
   const outputData = await session.run(feeds);
   // Get the end time to calculate inference time.
   const end = new Date();
   // Convert to seconds.
   const inferenceTime = (end.getTime() - start.getTime())/1000;
   // Get output results with the output name from the model export.
   const output = outputData[session.outputNames[0]];
   //Get the softmax of the output data. The softmax transforms values to be between 0 and 1
   var outputSoftmax = softmax(Array.prototype.slice.call(output.data));
   //Get the top 5 results.
   var results = imagenetClassesTopK(outputSoftmax, 5);
   console.log('results: ', results);
   return [results, inferenceTime];
}