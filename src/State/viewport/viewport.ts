import type { ViewportOptions } from './types';
import { DEFAULT_VIEWPORT_OPTIONS } from './default';

export class Viewport {

    private _width: number;
    private _height: number;
    private _pixelRatio: number;
    private readonly _maxPixelRatio: number;

    constructor(options: Partial<ViewportOptions> = {}) {

        const { width, height, pixelRatio, maxPixelRatio } = DEFAULT_VIEWPORT_OPTIONS;

        this._width = width;
        this._height = height;
        this._pixelRatio = pixelRatio;
        this._maxPixelRatio = options.maxPixelRatio ?? maxPixelRatio;


    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    get aspect() {
        return this.width / this._height;
    }

    get pixelRatio() {
        return this._pixelRatio;
    }

    public resize() {
        this._width = window.innerWidth;
        this._height = window.innerHeight;
        this._pixelRatio = Math.min(window.devicePixelRatio, this._maxPixelRatio);
    }






}