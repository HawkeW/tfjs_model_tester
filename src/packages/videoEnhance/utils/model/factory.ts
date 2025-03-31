import { IModel } from "../types";
import { OnnxModel } from "./onnx";
import { TfModel } from "./tfjs";

export const enum ModelType {
  tfjs = 'tfjs',
  onnx = 'onnx',
}

export type ModelInitOptions = {
  type: ModelType;
  url: string;
  onProgress?: (percent: number) => void;
}

export interface TfjsModelOptions extends ModelInitOptions   {
  type: ModelType.tfjs
  params?: {
    modelJson: string;
    labels: string[];
  }
  backend?: string; 
}

export interface OnnxModelOptions extends ModelInitOptions {
  type: ModelType.onnx
}

export type ModelOptions = TfjsModelOptions | OnnxModelOptions;


export function createModel(options: ModelOptions): Promise<IModel> {
  switch (options.type) {
    case ModelType.tfjs:
      return TfModel.fromUrl(options.url, options.onProgress);
    case ModelType.onnx:
      return OnnxModel.fromUrl(options.url, options.onProgress);
    default:
      throw new Error('Model type not supported');
  }
}