import type { RendererOptions } from './types';

export const DEFAULT_RENDERER_OPTIONS: RendererOptions = {
    canvas: document.getElementById('app') as HTMLCanvasElement,
    width: window.innerWidth,
    height: window.innerHeight

}