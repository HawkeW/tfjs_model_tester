import * as ort from 'onnxruntime-web';
import type { InferenceSession } from 'onnxruntime-common';
import { DetectCallback, DetectOptions, DetectResult, IModel } from "../../types";
import { detectWorkerOnnx } from "./worker/detectInstance";
import { WorkerEventDataCmd, WorkerEventDataDetect, WorkerEventDataTestRun } from "../types";

export class OnnxModel implements IModel {
  src: string
  net?: InferenceSession;
  labels: string[];
  inputShape?: number[];
  frameRate?: number;

  loaded = false;

  constructor(options: any) {

  }

  dispose(): void {
    detectWorkerOnnx.postMessage({
      cmd: WorkerEventDataCmd.disposeModel,
    });
  }

  get numClass(): number {
    throw new Error("Method not implemented.");
  }

  /**
 * Function run inference and do detection from source.
 * @param {ImageBitmap} source
 * @param {VoidFunction} callback function to run after detection process
 */
  async detect(source: ImageBitmap, opt?: DetectOptions): Promise<DetectResult> {
    return new Promise((resolve, reject) => {
      detectWorkerOnnx.postMessage({
        cmd: WorkerEventDataCmd.detect,
        data: {
          source,
          options: opt,
        },
      } as WorkerEventDataDetect);
      detectWorkerOnnx.onmessage = (ev: MessageEvent<DetectResult>) => {
        resolve(ev.data);
      };
    });
  }

  detectState = false;

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

  testRun(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      if (!this.inputShape) return;
      detectWorkerOnnx.postMessage({
        cmd: WorkerEventDataCmd.testRun,
      } as WorkerEventDataTestRun);
      detectWorkerOnnx.onmessage = (ev: MessageEvent<boolean>) => {
        if (ev.data) {
          resolve(ev.data);
        } else {
          reject(new Error('Test run failed'));
        }
      };
    });
  }

  async loadModel(opt?: { onProgress: (percent: number) => void }) {
    return new Promise<boolean>((resolve, reject) => {
      detectWorkerOnnx.postMessage({
        cmd: WorkerEventDataCmd.loadModel,
        data: {
          model: this.src,
          labels: this.labels,
        },
      });
      detectWorkerOnnx.onmessage = (ev: MessageEvent<{ msg: any; cmd: string; percent: number; inputShape?: number[] }>) => {
        if (ev.data.cmd === WorkerEventDataCmd.loadModel) {
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

  static async fromUrl(url: string, onProgress: (percent: number) => void) {
    return new OnnxModel({

    })
  }

  getSourceSize(source: HTMLVideoElement | HTMLCanvasElement) {
    if (source instanceof HTMLVideoElement) {
      return [source.videoHeight, source.videoWidth];
    }
    return [source.height, source.width];
  }
}