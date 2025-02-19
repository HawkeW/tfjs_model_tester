import type {GraphModel} from '@tensorflow/tfjs';

export interface IModel {
  modelJson: string;
  net?: GraphModel;
  labels: string[];
}

export type DetectResult = {
  modelSize: [number, number];
  ratios: [number, number];
  boxes: number[] | Float32Array | Int32Array | Uint8Array;
  labels: string[];
  scores: number[];
  classes: number[];
};
export type DetectCallback = (result: DetectResult) => Promise<void>;
export type DetectOptions = {
  scoreThreshold?: number;
};
