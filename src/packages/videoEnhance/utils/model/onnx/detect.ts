import { DetectOptions } from "../../types";
import * as ort from 'onnxruntime-web';
import type { InferenceSession } from 'onnxruntime-common';
// 图像预处理
async function preprocess(imageBitmap: ImageBitmap, modelSize: [number, number]) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const [modelHeight, modelWidth] = modelSize;
  
  // 计算缩放比例
  const modelAspect = modelWidth / modelHeight;
  const imageAspect = imageBitmap.width / imageBitmap.height;
  
  let resizeWidth, resizeHeight;
  let padLeft = 0, padTop = 0;

  // 当宽高比一致时直接缩放
  if (Math.abs(modelAspect - imageAspect) < 1e-6) {
    resizeWidth = modelWidth;
    resizeHeight = modelHeight;
  } 
  // 宽高比不一致时需要填充
  else {
    const scale = Math.min(
      modelWidth / imageBitmap.width,
      modelHeight / imageBitmap.height
    );
    
    resizeWidth = Math.floor(imageBitmap.width * scale);
    resizeHeight = Math.floor(imageBitmap.height * scale);
    
    // 计算填充位置
    padLeft = (modelWidth - resizeWidth) / 2;
    padTop = (modelHeight - resizeHeight) / 2;
  }

  // 绘制到Canvas
  canvas.height = modelHeight;
  canvas.width = modelWidth;
  
  ctx.fillStyle = '#114514'; // 填充颜色
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    imageBitmap,
    0, 0, imageBitmap.width, imageBitmap.height,
    padLeft, padTop, resizeWidth, resizeHeight
  );

  // 转换为张量
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const tensorData = new Float32Array(3 * canvas.width * canvas.height);
  
  // 归一化处理 (假设模型需要0-1范围)
  for (let i = 0; i < imageData.data.length; i += 4) {
    tensorData[i / 4] = imageData.data[i] / 255;         // R
    tensorData[imageData.data.length / 4 + i / 4] = imageData.data[i + 1] / 255; // G
    tensorData[imageData.data.length / 2 + i / 4] = imageData.data[i + 2] / 255; // B
  }

  return new ort.Tensor('float32', tensorData, [1, 3, modelHeight, modelWidth]);
}

export const detect = async (
  source: ImageBitmap,
  model: { net: InferenceSession; },
  {
    scoreThreshold = 0.5
  }: DetectOptions,
) => {
  const { net: session } = model;
  // Get start time to calculate inference time.
  const start = new Date();

  const tensor = await preprocess(source, [640, 640]);

  const { output: outputData } = await session.run({ images: tensor });
  const end = new Date();
  const inferenceTime = (end.getTime() - start.getTime());
  const output = outputData[session.outputNames[0]];
  //Get the softmax of the output data. The softmax transforms values to be between 0 and 1
  var outputSoftmax = ort.softmax(Array.prototype.slice.call(output.data));
  //Get the top 5 results.
  var results = ort.imagenetClassesTopK(outputSoftmax, 5);
  console.log('results: ', results);
  return [results, inferenceTime];
}