import { vec3 } from 'gl-matrix';
import type { SunStateOptions } from './types';
import { DEFAULT_SUN_CONFIG } from './default';
import type { Time } from '../time';
import { State } from '../state';
import { thickness } from 'three/tsl';


export class SunState {

    private _position: vec3;
    private _color: vec3;
    private _direction: vec3;

    private _intensity: number;

    private _radius: number;
    private _angle: number;
    private _orbitSpeed: number;
    private _orbitRadius: number;
    private _center: vec3;

    private readonly _time: Time;
    private _dir = 1;


    constructor(options: Partial<SunStateOptions> = {}) {

        const state = State.getInstance();
        this._time = state.time;


        const { initColor, initDirection, center, initPosition, radius, intensity, initAngle, initOrbitSpeed, orbitRadius } = DEFAULT_SUN_CONFIG;

        this._position = options.initPosition ?? initPosition;
        this._color = options.initColor ?? initColor;
        this._direction = options.initDirection ?? initDirection;
        this._radius = options.radius ?? radius;
        this._intensity = options.intensity ?? intensity;
        this._angle = options.initAngle ?? initAngle;
        this._orbitSpeed = options.initOrbitSpeed ?? initOrbitSpeed;
        this._orbitRadius = options.orbitRadius ?? orbitRadius;
        this._center = options.center ?? center;


    }
    get radius() {
        return this._radius;
    }
    get position() {
        return this._position;
    }
    get time() {
        return this._time;
    }
    get direction() {
        return this._direction;
    }
    get color() {
        return this._color;
    }
    get intensity() {
        return this._intensity;
    }
    get center() {
        return this._center;
    }
    public update() {
        if (this._angle >= Math.PI) this._dir = -1;
        if (this._angle <= 0) this._dir = 1;

        this._angle += this.time.deltaTime * this._orbitSpeed * this._dir;
        console.log(this._angle, this._dir);
        this._position[0] = Math.cos(this._angle) * this._orbitRadius;
        this._position[1] = Math.sin(this._angle) * this._orbitRadius;

    }



}