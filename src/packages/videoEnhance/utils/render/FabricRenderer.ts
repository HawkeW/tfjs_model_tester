import {ObjectRenderer} from './ObjectRenderer';

export class FabricObjectRenderer extends ObjectRenderer {
  init(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  render(
    boxes: Float32Array | Int32Array | Uint8Array | number[],
    labels: string[],
    scores: number[],
    classes: number[],
    ratios: [number, number],
  ): void {
    throw new Error('Method not implemented.');
  }

  clear(): void {
    throw new Error('Method not implemented.');
  }

  dispose(): void {
    throw new Error('Method not implemented.');
  }

  capture(target: HTMLCanvasElement): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
