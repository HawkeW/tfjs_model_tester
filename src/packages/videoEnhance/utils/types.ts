import type {GraphModel} from '@tensorflow/tfjs';

export interface IModel {
  modelJson: string;
  net?: GraphModel;
  labels: string[];
  frameRate?: number;

  inputShape?: number[];

  dispose(): void;

  get numClass(): number;

  detect(source: ImageBitmap, opt?: DetectOptions): Promise<DetectResult>;

  detectVideo(
    source: HTMLVideoElement | HTMLCanvasElement,
    opt: { once: boolean; onOutput?: DetectCallback; scoreThreshold?: number },
  ):void;

  testRun(): Promise<unknown>;

  loadModel(opt?: { onProgress: (percent: number) => void }): Promise<boolean>;
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
