import { GraphModel } from "@tensorflow/tfjs";
import { IOHandler } from "@tensorflow/tfjs-core/dist/io/types";
import { DetectCallback, DetectOptions, DetectResult, IModel } from "../../types";

export class OnnxModel implements IModel {
  modelJson: string
  net?: GraphModel<string | IOHandler>;
  labels: string[];
  inputShape?: number[];
  frameRate?: number;

  constructor(options: any) {

  }

  dispose(): void {
    throw new Error("Method not implemented.");
  }

  get numClass(): number {
    throw new Error("Method not implemented.");
  }

  detectVideo(source: HTMLVideoElement | HTMLCanvasElement, opt: { once: boolean; onOutput?: DetectCallback; scoreThreshold?: number; }): void {
    throw new Error("Method not implemented.");
  }

  detect(source: ImageBitmap, opt?: DetectOptions): Promise<DetectResult> {
    throw new Error("Method not implemented.");
  }

  testRun(): Promise<unknown> {
    throw new Error("Method not implemented.");
  }

  loadModel(opt?: { onProgress: (percent: number) => void; }): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  static async fromUrl(url: string, onProgress: (percent: number) => void) {
    return new OnnxModel({

    })
  }
}