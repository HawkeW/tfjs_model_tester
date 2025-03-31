
import { createModel, ModelOptions, ModelType } from './utils/model/factory';
import { createObjectRenderer, ObjectRenderer } from './utils/render';
import { DetectCallback, DetectResult, IModel } from './utils/types';

export class VideoEnhancer {
  ready = false;

  model?: IModel | null;

  modelName = '';

  loadingModel = false;

  loadingModelProgress = 0;

  renderer?: ObjectRenderer | null;

  private static _instance?: VideoEnhancer;

  static getInstance(): VideoEnhancer {
    if (!VideoEnhancer._instance) VideoEnhancer._instance = new VideoEnhancer();
    return VideoEnhancer._instance!;
  }

  async loadModel(opt: ModelOptions) {
    this.loadingModel = true;
    this.loadingModelProgress = 0;

    const model = await createModel( {
      ...opt,
      onProgress: (percent) => {
        if (percent >= 100) {
          this.loadingModel = false;
          this.loadingModelProgress = 100;
        } else {
          this.loadingModel = true;
          this.loadingModelProgress = percent;
        }

        opt.onProgress?.(percent);
      }
    });

    return model;
    
  }

  testRun() {
    return this.model?.testRun();
  }

  async setRenderer(
    input: HTMLVideoElement | HTMLCanvasElement,
    output: HTMLCanvasElement,
    onSelect: (res: {image: string} & DetectResult) => void,
  ) {
    if (this.renderer) return;
    const renderer = createObjectRenderer('pixi', output);
    await renderer.init();
    this.renderer = renderer;

    this.renderer.onSelect = async (e, res) => {
      const [_, modelHeight, modelWidth] = this.model!.inputShape!;
      const {canvas, ...data} = res;
      const image = await this.capture(input, canvas);
      onSelect({image, ...data, modelSize: [modelHeight, modelWidth]});
    };
  }

  detectVideo(
    input: HTMLVideoElement | HTMLCanvasElement,
    {once, onOutput, scoreThreshold}: {once: boolean; onOutput: DetectCallback; scoreThreshold?: number},
  ) {
    return this.model?.detectVideo(input, {
      once,
      onOutput: async (res) => {
        if (!res || !res.boxes.length) {
          this.renderer?.clear();
          return;
        }
        this.renderer?.render(res.boxes, res.labels, res.scores, res.classes, res.ratios, scoreThreshold);
        onOutput(res);
        // 只检测一次，有结果则停止检测
        if (once && res.boxes.length) {
          this.renderer?.clear();
        }
      },
    });
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

  dispose() {
    this.model?.dispose();
    this.renderer?.dispose();
    this.renderer = null;
    this.model = null;
  }
}
