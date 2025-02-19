import {FabricObjectRenderer} from './FabricRenderer';
import {ObjectRenderer} from './ObjectRenderer';
import {PixiObjectRenderer} from './PixiRenderer';

export type RendererType = 'fabric' | 'pixi';

export function createObjectRenderer(type: RendererType, canvas: HTMLCanvasElement): ObjectRenderer {
  switch (type) {
    case 'fabric':
      return new FabricObjectRenderer(canvas);
    case 'pixi':
      return new PixiObjectRenderer(canvas);
    default:
      throw new Error(`Unsupported renderer type: ${type}`);
  }
}
