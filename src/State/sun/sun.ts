import { vec3 } from 'gl-matrix';
import type { SunStateOptions } from './types';
import { DEFAULT_SUN_CONFIG } from './default';
import type { Time } from '../time';
import { State } from '../state';


export class SunState {

    private _position: vec3;
    private _color: vec3;
    private _direction: vec3;

    private _intensity: number;
    private _distance: number;

    private _radius: number;

    private readonly _time: Time;


    constructor(options: Partial<SunStateOptions> = {}) {

        const state = State.getInstance();
        this._time = state.time;


        const { initColor, initDirection, initPosition, radius, distance, intensity } = DEFAULT_SUN_CONFIG;

        this._position = options.initPosition ?? initPosition;
        this._color = options.initColor ?? initColor;
        this._direction = options.initDirection ?? initDirection;
        this._radius = options.radius ?? radius;
        this._distance = options.distance ?? distance;
        this._intensity = options.intensity ?? intensity;


    }
    get radius() {
        return this._radius;
    }
    get time() {
        return this._time;
    }
    public update() {
        console.log("updating sun ...");

    }



}