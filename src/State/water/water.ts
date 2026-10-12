import type { WaterStateOptions } from './types';
import { DEFAULT_WATER_OPTIONS } from './default';
import { vec3 } from 'gl-matrix';

export class WaterState {

    private _position: vec3;

    private _width: number;
    private _height: number;

    private _widthSegments: number;
    private _heightSegments: number;

    private _waveAmplitude: number;
    private _spatialFrequency: number;
    private _angularFrequency: number;

    constructor(options: Partial<WaterStateOptions> = {}) {

        const { position, width, height, widthSegments, heightSegments, waveAmplitude, angularFrequency, spatialFrequency } = DEFAULT_WATER_OPTIONS;

        this._width = options.width ?? width;
        this._height = options.height ?? height;
        this._heightSegments = options.heightSegments ?? heightSegments;
        this._widthSegments = options.widthSegments ?? widthSegments;
        this._angularFrequency = options.angularFrequency ?? angularFrequency;
        this._spatialFrequency = options.spatialFrequency ?? spatialFrequency;
        this._waveAmplitude = options.waveAmplitude ?? waveAmplitude;
        this._position = options.position ?? position;


    }
    get position() {
        return this._position;
    }
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    get widthSegments() {
        return this._widthSegments;
    }
    get heightSegements() {
        return this._heightSegments;
    }
    get spatialFrequency() {
        return this._spatialFrequency;
    }
    get waveAmplitude() {
        return this._waveAmplitude;
    }
    get angularFrequency() {
        return this._angularFrequency;
    }

    public update() {
        console.log("here is water pouring... ");
    }

}