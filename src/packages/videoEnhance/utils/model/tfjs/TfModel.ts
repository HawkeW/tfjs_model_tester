import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-backend-webgpu';
import '@tensorflow/tfjs-backend-wasm';
import { initWasmBackend } from '@/lib/tfjs-init';
import jsyaml from 'js-yaml';
import { detectWorkerTf } from './worker/workerInstance';
import { WorkerEventDataCmd, WorkerEventDataDetect, WorkerEventDataTestRun } from '../types/types.worker';
import { IModel, DetectOptions, DetectCallback, DetectResult } from '../../types';

interface YamlMetadata {
  description: string;
  author: string;
  date: string;
  version: string;
  license: string;
  docs: string;
  stride: number;
  task: string;
  batch: number;
  imgsz: number[];
  names: Record<string, string>;
}


let ready = false;
async function init(backend: string = 'webgl') {
  const currentBackend = tf.getBackend();
  if (currentBackend !== backend) {
    ready = false;
  }
  if (ready) return true;
  try {
    if (backend === 'wasm') {
      await initWasmBackend();
    } else {
      await tf.setBackend(backend);
    }
    console.log( backend, tf.getBackend()); // trigger backend ini
    await tf.ready();
    return true;
  } catch (e) {
    console.error('Failed to initialize backend:', e);
    return false;
  }
}

export class TfModel implements IModel {
  labels: string[];

  modelJson: string;

  loaded = false;
  

  inputShape?: number[];

  frameRate?: number;

  get numClass() {
    return this.labels.length;
  }

  constructor(options: {labels: string[], modelJson: string, frameRate?: number, inputShape?: number[]}) {
    this.labels = options.labels;
    this.modelJson = options.modelJson;
  }

  static async fromUrl(modelName: string, onProgress: (progress: number) => void) {
    await init();

    const assetBase = 'https://office-website-1251680498.cos.ap-shanghai.myqcloud.com/xinzhou/web_model';
    const modelJson = `${assetBase}/${modelName}/model.json`;
    const modelMeta = `${assetBase}/${modelName}/metadata.yaml`;

    const yamlText = await (await fetch(modelMeta)).text();
    const yamlData = jsyaml.load(yamlText) as YamlMetadata;
    const labels = Object.values(yamlData.names);

    if (!labels) {
      console.error('No Labels Fetched');
      return undefined;
    }

    const model = new TfModel({
      modelJson,
      labels,
    });

    let loadingModelProgress = 0;
    await model.loadModel({
      onProgress: (percent) => {
        loadingModelProgress = Math.round(percent);
        onProgress(loadingModelProgress);
      },
    });

    onProgress(100)

    return model;
  }

  async loadModel(opt?: { onProgress: (percent: number) => void }) {
    return new Promise<boolean>((resolve, reject) => {
      detectWorkerTf.postMessage({
        cmd: WorkerEventDataCmd.loadModel,
        data: {
          model: this.modelJson,
          labels: this.labels,
        },
      });
      detectWorkerTf.onmessage = (ev: MessageEvent<{ msg: any; cmd: string; percent: number; inputShape?: number[] }>) => {
        if (ev.data.cmd === 'loadModel') {
          opt?.onProgress?.(ev.data.percent);

          if (ev.data.percent === 100 && ev.data.inputShape) {
            this.inputShape = ev.data.inputShape;
            this.loaded = true;
            resolve(true);
          }
        }
      };
    });
  }

  /**
   * Function run inference and do detection from source.
   * @param {ImageBitmap} source
   * @param {VoidFunction} callback function to run after detection process
   */
  async detect(source: ImageBitmap, opt?: DetectOptions): Promise<DetectResult> {
    return new Promise((resolve, reject) => {
      detectWorkerTf.postMessage({
        cmd: WorkerEventDataCmd.detect,
        data: {
          source,
          options: opt,
        },
      } as WorkerEventDataDetect);
      detectWorkerTf.onmessage = (ev: MessageEvent<DetectResult>) => {
        resolve(ev.data);
      };
    });
  }

  testRun() {
    return new Promise((resolve, reject) => {
      if (!this.inputShape) return;
      detectWorkerTf.postMessage({
        cmd: WorkerEventDataCmd.testRun,
      } as WorkerEventDataTestRun);
      detectWorkerTf.onmessage = (ev: MessageEvent<boolean>) => {
        if (ev.data) {
          resolve(ev.data);
        } else {
          reject(new Error('Test run failed'));
        }
      };
    });
  }

  private detectState = false;

  /**
 * Function to detect video from every source.
 * @param {HTMLVideoElement | HTMLCanvasElement} vidSource video source
 * @param {HTMLCanvasElement} canvasRef canvas reference
 */
  detectVideo(
    source: HTMLVideoElement | HTMLCanvasElement,
    opt: { once: boolean; onOutput?: DetectCallback; scoreThreshold?: number } = { once: false, scoreThreshold: 0.6 },
  ) {
    const detectFrame = async () => {
      if (!this.detectState || this.loaded == null) {
        opt.onOutput?.(null);
        return;
      }

      if (source instanceof HTMLVideoElement && source.videoWidth === 0 && source.srcObject === null) {
        opt.onOutput?.(null);
        return; // handle if source is closed
      }

      if (source instanceof HTMLCanvasElement && source.width === 0) {
        opt.onOutput?.(null);
        return; // handle if source is closed
      }
      // 图像预处理。这里转换时做了压缩
      const [sourceHeight, sourceWidth] = this.getSourceSize(source);
      const targetWidth = this.inputShape[2];
      const resizeRatio = Math.min(sourceWidth, targetWidth) / sourceWidth;
      const resizeWidth = parseInt((sourceWidth * resizeRatio).toString(), 10);
      const resizeHeight = parseInt((sourceHeight * resizeRatio).toString(), 10);
      const imageCapture = await createImageBitmap(source, {
        resizeWidth,
        resizeHeight,
      });
      const result = await this.detect(imageCapture, { scoreThreshold: opt.scoreThreshold });

      const [xRatio, yRatio] = result.ratios;
      result.ratios = [xRatio / resizeRatio, yRatio / resizeRatio];

      // 如果检测到物体，则执行回调
      opt.onOutput?.(result);
      // 只检测一次，有结果则停止检测
      if (opt.once && result.boxes.length) {
        return;
      }
      // 如果设置了帧率，则按照帧率检测
      if (this.frameRate !== undefined && this.frameRate !== 0) {
        setTimeout(detectFrame, 1000 / this.frameRate);
      }
      // 如果没有设置帧率，则使用requestAnimationFrame检测
      else {
        requestAnimationFrame(detectFrame); // get another frame
      }
    };
    this.detectState = true;
    detectFrame(); // initialize to detect every frame
  }

  stop() {
    this.detectState = false;
  }

  dispose() {
    detectWorkerTf.postMessage({
      cmd: WorkerEventDataCmd.disposeModel,
    });
  }

  getSourceSize(source: HTMLVideoElement | HTMLCanvasElement) {
    if (source instanceof HTMLVideoElement) {
      return [source.videoHeight, source.videoWidth];
    }
    return [source.height, source.width];
  }
}
