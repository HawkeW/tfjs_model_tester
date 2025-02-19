import {Application, Text as PixiText, Graphics, RenderTexture, Sprite} from 'pixi.js';
import {ObjectRenderer} from './ObjectRenderer';
import {Colors} from './renderBox';

export class PixiObjectRenderer extends ObjectRenderer {
  private app: Application;

  private graphicsList: Graphics[] = [];

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.app = new Application();
  }

  async init() {
    await this.app.init({
      canvas: this._canvas,
      width: this._canvas.width,
      height: this._canvas.height,
      backgroundAlpha: 0,
    });
  }

  render(
    boxes: Float32Array | Int32Array | Uint8Array | number[],
    labels: string[],
    scores: number[],
    classes: number[],
    ratios: [number, number],
    scoreThreshold = 0.6,
  ): void {
    this.clear();

    const targetWidth = this.app.renderer.width;
    const targetHeight = this.app.renderer.height;

    const colors = new Colors();
    const fontSize = Math.max(Math.round(Math.max(targetWidth, targetHeight) / 40), 14);

    for (let i = 0; i < scores.length; ++i) {
      if (scores[i] < scoreThreshold) continue;
      const klass = labels[classes[i]];
      const color = colors.get(classes[i]);
      const score = (scores[i] * 100).toFixed(1);

      let [y1, x1, y2, x2] = boxes.slice(i * 4, (i + 1) * 4);
      [x1, x2] = [x1 * ratios[0], x2 * ratios[0]];
      [y1, y2] = [y1 * ratios[1], y2 * ratios[1]];
      const boxWidth = x2 - x1;
      const boxHeight = y2 - y1;

      const graphics = new Graphics();
      graphics
        .rect(x1, y1, boxWidth, boxHeight)
        .stroke({
          color,
          width: 2,
        })
        .fill({
          color: Colors.hexToRgba(color, 0.2)!,
        });

      // Measure text
      const label = new PixiText({
        text: `${klass} - ${score}%`,
        style: {
          fontFamily: 'Arial',
          fontSize,
          fill: '#ffffff',
        },
      });
      const textWidth = label.width;
      const textHeight = label.height;

      // Draw text background
      const yText = y1 - (textHeight + 2);
      graphics
        .fill({
          color: parseInt(color.slice(1), 16),
        })
        .rect(x1 - 1, yText < 0 ? 0 : yText, textWidth + 2, textHeight + 2)
        .fill();

      // Add text
      label.x = x1 - 1;
      label.y = yText < 0 ? 0 : yText;
      graphics.addChild(label);

      // Opt-in to interactivity
      graphics.eventMode = 'static';

      // Shows hand cursor
      graphics.cursor = 'pointer';

      graphics.on('mousedown', (e) => {
        this.onSelect?.(e, {
          boxes,
          labels,
          scores,
          classes,
          ratios,
          canvas: this.app.canvas,
        });
      });

      this.app.stage.addChild(graphics);
      this.graphicsList.push(graphics);
    }
  }

  capture(target: HTMLCanvasElement): Promise<void> {
    const externalCtx = target.getContext('2d');
    return new Promise((resolve) => {
      const renderTexture = RenderTexture.create({width: this.app.canvas.width, height: this.app.canvas.height});
      this.app.ticker.addOnce(() => {
        // 将 PixiJS 场景渲染到 combinedCanvas 上
        this.app.renderer.render(this.app.stage, {renderTexture});
        const sprite = new Sprite(renderTexture);
        externalCtx!.drawImage(
          this.app.renderer.extract.canvas(sprite) as HTMLCanvasElement,
          0,
          0,
          target.width,
          target.height,
        );
        resolve();
      });
    });
  }

  clear(): void {
    this.app.stage.removeChildren();
    this.graphicsList.length = 0;
  }

  dispose(): void {
    this.clear();
    this.app.destroy(true, {children: true, texture: true});
  }
}
