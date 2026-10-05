import type { ViewportOptions } from './types';
export const DEFAULT_VIEWPORT_OPTIONS: ViewportOptions = {
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: window.devicePixelRatio,
    maxPixelRatio: 2
}