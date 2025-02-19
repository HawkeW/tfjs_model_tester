import {DetectResult} from '../types';

export interface IObjectRenderer {
  render(
    boxes: Float32Array | Int32Array | Uint8Array | number[],
    labels: string[],
    scores: number[],
    classes: number[],
    ratios: [number, number],
  ): void;
  clear(): void;
  dispose(): void;
}

export abstract class ObjectRenderer implements IObjectRenderer {
  protected _canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas;
  }

  abstract init(): Promise<void>;

  abstract render(
    boxes: Float32Array | Int32Array | Uint8Array | number[],
    labels: string[],
    scores: number[],
    classes: number[],
    ratios: [number, number],
    scoreThreshold?: number,
  ): void;

  onSelect?: (e: any, result: Omit<DetectResult, 'modelSize'> & {canvas: HTMLCanvasElement}) => void;

  abstract clear(): void;

  abstract dispose(): void;

  abstract capture(target: HTMLCanvasElement): Promise<void>;
}
