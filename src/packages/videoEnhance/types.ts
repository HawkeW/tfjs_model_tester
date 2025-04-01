export interface DetectOptions {
  scoreThreshold?: number;
  nmsThreshold?: number;
}

export interface DetectResult {
  boxes: number[][];
  scores: number[];
  classes: number[];
  ratios: [number, number];
}