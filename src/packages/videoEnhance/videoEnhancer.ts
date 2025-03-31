import jsyaml from 'js-yaml';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-backend-webgpu';
import '@tensorflow/tfjs-backend-wasm';
import {TfModel} from './utils/model';
import { initWasmBackend } from '@/lib/tfjs-init';

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
        await tf.ready();
        this.ready = true;
        console.log( backend, tf.getBackend()); // trigger backend ini
        return true;
      }
      await tf.setBackend(backend);
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
}
