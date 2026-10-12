import type { WaterStateOptions } from './types';
import { DEFAULT_WATER_OPTIONS } from './default';
import { vec2, vec3 } from 'gl-matrix';

export class WaterState {

    private _position: vec3;

    private _width: number;
    private _height: number;

    private _widthSegments: number;
    private _heightSegments: number;

    private readonly _waveAmplitude: vec3;
    private readonly _spatialFrequency: vec3;
    private readonly _angularFrequency: vec3;
    private readonly _directions: vec2[];
    private readonly _transition = WaterState.createTransitionBuffers();
    private _lastRandomizationTime = 0;
    private _transitionStartTime = 0;
    private readonly _randomizationInterval: number;
    private readonly _transitionDuration: number;
    private _hasTransitionStarted = false;

    constructor(options: Partial<WaterStateOptions> = {}) {

        const { position, width, height, widthSegments, directions, heightSegments, waveAmplitude, angularFrequency, spatialFrequency, randomizationInterval, transitionDuration } = DEFAULT_WATER_OPTIONS;

        this._width = options.width ?? width;
        this._height = options.height ?? height;
        this._heightSegments = options.heightSegments ?? heightSegments;
        this._widthSegments = options.widthSegments ?? widthSegments;
        this._position = options.position ?? position;
        this._angularFrequency = options.angularFrequency ?? angularFrequency;
        this._spatialFrequency = options.spatialFrequency ?? spatialFrequency;
        this._waveAmplitude = options.waveAmplitude ?? waveAmplitude;
        this._directions = options.directions ?? directions;
        this._randomizationInterval = options.randomizationInterval ?? randomizationInterval;
        this._transitionDuration = options.transitionDuration ?? transitionDuration;

    }
    get position() {
        return this._position;
    }
    get directions() {
        return this._hasTransitionStarted ? this._transition.currentDirections : this._directions;
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
        return this._hasTransitionStarted ? this._transition.currentSpatialFrequency : this._spatialFrequency;
    }
    get waveAmplitude() {
        return this._hasTransitionStarted ? this._transition.currentWaveAmplitude : this._waveAmplitude;
    }
    get angularFrequency() {
        return this._hasTransitionStarted ? this._transition.currentAngularFrequency : this._angularFrequency;
    }

    public update(elapsedTime: number) {
        if (elapsedTime - this._lastRandomizationTime >= this._randomizationInterval) {
            this.startWaveTransition(elapsedTime);
            this._lastRandomizationTime = elapsedTime;
        }

        const progress = Math.min(
            Math.max((elapsedTime - this._transitionStartTime) / this._transitionDuration, 0),
            1
        );
        const easedProgress = progress * progress * (3 - 2 * progress);

        vec3.lerp(this._transition.currentWaveAmplitude, this._transition.waveAmplitudeFrom, this._transition.waveAmplitudeTo, easedProgress);
        vec3.lerp(this._transition.currentSpatialFrequency, this._transition.spatialFrequencyFrom, this._transition.spatialFrequencyTo, easedProgress);
        vec3.lerp(this._transition.currentAngularFrequency, this._transition.angularFrequencyFrom, this._transition.angularFrequencyTo, easedProgress);
        vec2.lerp(this._transition.currentDirections[0], this._transition.directionsFrom[0], this._transition.directionsTo[0], easedProgress);
        vec2.lerp(this._transition.currentDirections[1], this._transition.directionsFrom[1], this._transition.directionsTo[1], easedProgress);
        vec2.lerp(this._transition.currentDirections[2], this._transition.directionsFrom[2], this._transition.directionsTo[2], easedProgress);
        vec2.normalize(this._transition.currentDirections[0], this._transition.currentDirections[0]);
        vec2.normalize(this._transition.currentDirections[1], this._transition.currentDirections[1]);
        vec2.normalize(this._transition.currentDirections[2], this._transition.currentDirections[2]);
    }

    private startWaveTransition(elapsedTime: number) {
        const transition = this._transition;
        vec3.copy(transition.waveAmplitudeFrom, this.waveAmplitude);
        vec3.copy(transition.spatialFrequencyFrom, this.spatialFrequency);
        vec3.copy(transition.angularFrequencyFrom, this.angularFrequency);
        vec2.copy(transition.directionsFrom[0], this.directions[0]);
        vec2.copy(transition.directionsFrom[1], this.directions[1]);
        vec2.copy(transition.directionsFrom[2], this.directions[2]);

        this.randomizeDirection(transition.directionsTo[0], this._directions[0]);
        this.randomizeDirection(transition.directionsTo[1], this._directions[1]);
        this.randomizeDirection(transition.directionsTo[2], this._directions[2]);
        this.randomizeVector(transition.waveAmplitudeTo, this._waveAmplitude, 0.8, 1.2);
        this.randomizeVector(transition.spatialFrequencyTo, this._spatialFrequency, 0.85, 1.15);
        this.randomizeVector(transition.angularFrequencyTo, this._angularFrequency, 0.85, 1.15);
        this._hasTransitionStarted = true;
        this._transitionStartTime = elapsedTime;
    }

    private randomizeVector(out: vec3, source: vec3, minScale: number, maxScale: number) {
        for (let index = 0; index < 3; index++) {
            const scale = minScale + Math.random() * (maxScale - minScale);
            out[index] = source[index] * scale;
        }
    }

    private randomizeDirection(out: vec2, source: vec2) {
        const angle = (Math.random() * 2 - 1) * 0.2;
        vec2.rotate(out, source, [0, 0], angle);
        vec2.normalize(out, out);
    }

    private static createTransitionBuffers() {
        return {
            currentWaveAmplitude: vec3.create(),
            currentSpatialFrequency: vec3.create(),
            currentAngularFrequency: vec3.create(),
            currentDirections: [vec2.create(), vec2.create(), vec2.create()],
            waveAmplitudeFrom: vec3.create(),
            waveAmplitudeTo: vec3.create(),
            spatialFrequencyFrom: vec3.create(),
            spatialFrequencyTo: vec3.create(),
            angularFrequencyFrom: vec3.create(),
            angularFrequencyTo: vec3.create(),
            directionsFrom: [vec2.create(), vec2.create(), vec2.create()],
            directionsTo: [vec2.create(), vec2.create(), vec2.create()]
        };
    }

}