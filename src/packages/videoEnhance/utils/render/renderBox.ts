/**
 * Render prediction boxes
 * @param {HTMLCanvasElement} canvasRef canvas tag reference
 * @param {Array} boxesData boxes array
 * @param {Array} scoresData scores array
 * @param {Array} classesData class array
 * @param {Array[Number]} ratios boxes ratio [xRatio, yRatio]
 */
export const renderBoxes = (
  canvasRef: HTMLCanvasElement,
  boxesData: Float32Array | Int32Array | Uint8Array | number[],
  labels: string[],
  scoresData: number[],
  classesData: number[],
  ratios: [number, number],
) => {
  const ctx = canvasRef.getContext('2d')!;

  // 计算目标画布的宽度和高度
  const targetWidth = ctx.canvas.width;
  const targetHeight = ctx.canvas.height;
  ctx.clearRect(0, 0, targetWidth, targetHeight); // clean canvas

  const colors = new Colors();

  // font configs
  const font = `${Math.max(Math.round(Math.max(targetWidth, targetHeight) / 40), 14)}px Arial`;
  ctx.font = font;
  ctx.textBaseline = 'top';

  for (let i = 0; i < scoresData.length; ++i) {
    // filter based on class threshold
    const klass = labels[classesData[i]];
    const color = colors.get(classesData[i]);
    const score = (scoresData[i] * 100).toFixed(1);

    // 计算裁剪区域的坐标范围，确保目标框在视频元素内部显示
    let [y1, x1, y2, x2] = boxesData.slice(i * 4, (i + 1) * 4);
    x1 *= ratios[0];
    x2 *= ratios[0];
    y1 *= ratios[1];
    y2 *= ratios[1];
    // 计算目标框在Canvas上的绘制位置
    const targetWidth = x2 - x1;
    const targetHeight = y2 - y1;

    // draw box.
    ctx.fillStyle = Colors.hexToRgba(color, 0.2)!;
    ctx.fillRect(x1, y1, targetWidth, targetHeight);

    // draw border box.
    ctx.strokeStyle = color;
    ctx.lineWidth = Math.max(Math.min(targetWidth, targetHeight) / 200, 2.5);
    ctx.strokeRect(x1, y1, targetWidth, targetHeight);

    // Draw the label background.
    ctx.fillStyle = color;
    const textWidth = ctx.measureText(`${klass} - ${score}%`).width;
    const textHeight = parseInt(font, 10); // base 10
    const yText = y1 - (textHeight + ctx.lineWidth);
    ctx.fillRect(
      x1 - 1,
      yText < 0 ? 0 : yText, // handle overflow label box
      textWidth + ctx.lineWidth,
      textHeight + ctx.lineWidth,
    );

    // Draw labels
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`${klass} - ${score}%`, x1 - 1, yText < 0 ? 0 : yText);
  }

  ctx.drawImage(canvasRef, 0, 0, targetWidth, targetHeight);
};

export const renderClear = (canvasRef: HTMLCanvasElement) => {
  const ctx = canvasRef.getContext('2d')!;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // clean canvas
};

export class Colors {
  palette: string[];

  n: number;

  // ultralytics color palette https://ultralytics.com/
  constructor() {
    this.palette = [
      '#FF3838',
      '#FF9D97',
      '#FF701F',
      '#FFB21D',
      '#CFD231',
      '#48F90A',
      '#92CC17',
      '#3DDB86',
      '#1A9334',
      '#00D4BB',
      '#2C99A8',
      '#00C2FF',
      '#344593',
      '#6473FF',
      '#0018EC',
      '#8438FF',
      '#520085',
      '#CB38FF',
      '#FF95C8',
      '#FF37C7',
    ];
    this.n = this.palette.length;
  }

  get = (i: number) => this.palette[Math.floor(i) % this.n];

  static hexToRgba = (hex: string, alpha: number) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `rgba(${[parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)].join(', ')}, ${alpha})`
      : null;
  };
}
