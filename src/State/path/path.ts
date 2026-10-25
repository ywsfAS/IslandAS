import { vec3 } from 'gl-matrix';
import type { PathStateOptions } from './types';
import { DEFAULT_PATH_CONFIG } from './default';

export class PathState {

    private _points: vec3[];
    private _width: number;
    private _closed: boolean;
    private _curveType: PathStateOptions['curveType'];
    private _tension: number;

    private _version = 0;

    constructor(options: Partial<PathStateOptions> = {}) {
        const { points, width, closed, curveType, tension } = DEFAULT_PATH_CONFIG;

        this._points = (options.points ?? points).map((p) => vec3.clone(p));
        this._width = options.width ?? width;
        this._closed = options.closed ?? closed;
        this._curveType = options.curveType ?? curveType;
        this._tension = options.tension ?? tension;
    }

    get points() { return this._points; }
    get width() { return this._width; }
    get closed() { return this._closed; }
    get curveType() { return this._curveType; }
    get tension() { return this._tension; }
    get version() { return this._version; }

    public setPoints(points: vec3[]) {
        this._points = points.map((p) => vec3.clone(p));
        this._version++;
    }

    public addPoint(point: vec3) {
        this._points.push(vec3.clone(point));
        this._version++;
    }

    public setWidth(width: number) {
        this._width = width;
        this._version++;
    }
}