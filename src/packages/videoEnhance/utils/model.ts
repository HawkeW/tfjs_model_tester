import DetectWorker from '../worker/detect.worker?worker';
import {IModel, DetectOptions, DetectCallback, DetectResult} from './types';
import {WorkerEventDataCmd, WorkerEventDataDetect, WorkerEventDataTestRun} from '../worker/types.worker';
import {ObjectRenderer, createObjectRenderer} from './render';

const detectWorker = new DetectWorker();

export class TfModel implements IModel {
  labels: string[];

  modelJson: string;

  loaded = false;

  inputShape?: number[];

  frameRate?: number;

  renderer?: ObjectRenderer;

  get numClass() {
    return this.labels.length;
  }

  constructor(options: IModel, opt?: {outputCanvas: HTMLCanvasElement}) {
    this.labels = options.labels;
    this.modelJson = options.modelJson;

    if (opt?.outputCanvas) {
      this.renderer = createObjectRenderer('pixi', opt.outputCanvas);
    }
  }

  async setRenderer(
    input: HTMLVideoElement | HTMLCanvasElement,
    output: HTMLCanvasElement,
    onSelect: (res: {image: string} & DetectResult) => void,
  ) {
    const renderer = createObjectRenderer('pixi', output);
    await renderer.init();
    this.renderer = renderer;

    this.renderer.onSelect = async (e, res) => {
      const [_, modelHeight, modelWidth] = this.inputShape!;
      const {canvas, ...data} = res;
      const image = await this.capture(input, canvas);
      onSelect({image, ...data, modelSize: [modelHeight, modelWidth]});
    };
  }

  /**
   * 将输入和输出合并成一个图片
   * @param input 输入的视频或图片
   * @param outputCanvas 输出的canvas
   * @returns 合并后的图片
   */
  async capture(input: HTMLVideoElement | HTMLCanvasElement, outputCanvas: HTMLCanvasElement): Promise<string> {
    const combinedCanvas = document.createElement('canvas');
    const combinedCtx = combinedCanvas.getContext('2d');

    // Set the combined canvas size to match the input
    combinedCanvas.width = outputCanvas.width;
    combinedCanvas.height = outputCanvas.height;

    // Draw the input (first layer)
    combinedCtx!.drawImage(input, 0, 0, combinedCanvas.width, combinedCanvas.height);

    await this.renderer?.capture(combinedCanvas);

    // combinedCtx!.drawImage(outputCanvas, 0, 0, combinedCanvas.width, combinedCanvas.height);

    return combinedCanvas.toDataURL();
  }

  async loadModel(opt?: {onProgress: (percent: number) => void}) {
    return new Promise<boolean>((resolve, reject) => {
      detectWorker.postMessage({
        cmd: WorkerEventDataCmd.loadModel,
        data: {
          model: this.modelJson,
          labels: this.labels,
        },
      });
      detectWorker.onmessage = (ev: MessageEvent<{msg: any; cmd: string; percent: number; inputShape?: number[]}>) => {
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
      detectWorker.postMessage({
        cmd: WorkerEventDataCmd.detect,
        data: {
          source,
          options: opt,
        },
      } as WorkerEventDataDetect);
      detectWorker.onmessage = (ev: MessageEvent<DetectResult>) => {
        resolve(ev.data);
      };
    });
  }

  testRun() {
    return new Promise((resolve, reject) => {
      if (!this.inputShape) return;
      detectWorker.postMessage({
        cmd: WorkerEventDataCmd.testRun,
      } as WorkerEventDataTestRun);
      detectWorker.onmessage = (ev: MessageEvent<boolean>) => {
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
    opt: {once: boolean; onOutput?: DetectCallback; scoreThreshold?: number} = {once: false, scoreThreshold: 0.6},
  ) {
    const detectFrame = async () => {
      if (!this.detectState || this.loaded == null) {
        this.renderer?.clear();
        return;
      }

      if (source instanceof HTMLVideoElement && source.videoWidth === 0 && source.srcObject === null) {
        this.renderer?.clear();
        return; // handle if source is closed
      }

      if (source instanceof HTMLCanvasElement && source.width === 0) {
        this.renderer?.clear();
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
      const result = await this.detect(imageCapture, {scoreThreshold: opt.scoreThreshold});

      const [xRatio, yRatio] = result.ratios;
      result.ratios = [xRatio / resizeRatio, yRatio / resizeRatio];
      // 渲染检测结果
      this.renderer?.render(
        result.boxes,
        result.labels,
        result.scores,
        result.classes,
        result.ratios,
        opt.scoreThreshold,
      );

      // 如果检测到物体，则执行回调
      if (result.boxes.length) {
        opt.onOutput?.(result);
      }
      // 如果只检测一次，则清空画布
      if (opt.once && result.boxes.length) {
        this.renderer?.clear();
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
    detectWorker.postMessage({
      cmd: WorkerEventDataCmd.disposeModel,
    });
    this.renderer?.dispose();
  }

  getSourceSize(source: HTMLVideoElement | HTMLCanvasElement) {
    if (source instanceof HTMLVideoElement) {
      return [source.videoHeight, source.videoWidth];
    }
    return [source.height, source.width];
  }
}
