import jsyaml from 'js-yaml';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import {TfModel} from './utils/model';

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

  async init() {
    if (this.ready) return true;
    try {
      await tf.setBackend('webgl');
      await tf.ready();
      this.ready = true;
      return true;
    } catch (e) {
      return false;
    }
  }

  async loadGraphModel(modelUrl: string, onProgress: (progress: number) => void) {
    await this.init();
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
