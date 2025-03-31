import jsyaml from 'js-yaml';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-backend-webgpu';
import '@tensorflow/tfjs-backend-wasm';
import {TfModel} from './utils/model';
import { initWasmBackend } from '@/lib/tfjs-init';
import { createObjectRenderer, ObjectRenderer } from './utils/render';
import { DetectCallback, DetectResult } from './utils/types';

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

export class VideoEnhancer {
  ready = false;

  model?: TfModel | null;

  modelName = '';

  loadingModel = false;

  loadingModelProgress = 0;

  renderer?: ObjectRenderer | null;

  private static _instance?: VideoEnhancer;

  static getInstance(): VideoEnhancer {
    if (!VideoEnhancer._instance) VideoEnhancer._instance = new VideoEnhancer();
    return VideoEnhancer._instance!;
  }

  async init(backend: string = 'webgl') {
    const currentBackend = tf.getBackend();
    if (currentBackend !== backend) {
      this.ready = false;
    }
    if (this.ready) return true;
    try {
      if (backend === 'wasm') {
        await initWasmBackend();
      } else {
        await tf.setBackend(backend);
      }
      console.log( backend, tf.getBackend()); // trigger backend ini
      await tf.ready();
      this.ready = true;
      return true;
    } catch (e) {
      console.error('Failed to initialize backend:', e);
      return false;
    }
  }

  async loadGraphModel(modelUrl: string, onProgress: (progress: number) => void, backend: string = 'webgl') {
    await this.init(backend);
    if (this.model) {
      this.model.dispose();
      this.model = null;
    }

    const modelJson = `${modelUrl}/model.json`;
    const modelMeta = `${modelUrl}/metadata.yaml`;
    const yamlText = await (await fetch(modelMeta)).text();
    const yamlData = jsyaml.load(yamlText) as YamlMetadata;
    const labels = Object.values(yamlData.names);
    if (!labels) {
      console.error('No Labels Fetched');
      return undefined;
    }

    this.model = new TfModel({
      modelJson,
      labels,
    });

    await this.model.loadModel({
      onProgress: (percent) => {
        this.loadingModel = true;
        this.loadingModelProgress = Math.round(percent);
        onProgress(this.loadingModelProgress);
      },
    });

    this.loadingModel = false;
    this.loadingModelProgress = 100;
    onProgress(this.loadingModelProgress);
    this.modelName = modelUrl;

    return this.model;
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
