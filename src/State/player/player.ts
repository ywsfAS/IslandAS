import type { PlayerOptions, Position } from './types';
import { DEFAULT_PLAYER_OPTIONS, PLAYER_CAPSULE_LENGTH, PLAYER_RADIUS, easeTowards, PLAYER_ROTATION_SPEED } from './default';
import { State } from '../state';
import type { Controls } from '../controls/controls';
import type { Time } from '../time';
import { vec2 } from 'gl-matrix';


export class PlayerState {

    private _rotation: number;
    private _normalAcceleration: number;
    private _boostAcceleration: number;
    private _speed: number;
    private _jumpPower: number;
    private _minHeight: number;
    private _maxHeight: number;

    private _position: Position;
    private _controls: Controls;
    private _time: Time;


    constructor(options: Partial<PlayerOptions> = {}) {

        const state = State.getInstance();

        this._controls = state.controls;
        this._time = state.time;


        const { rotation, normalAcceleration, boostAcceleration, jumpPower, speed, position, maxHeight, minHeight } = DEFAULT_PLAYER_OPTIONS;

        this._rotation = options.rotation ?? rotation;
        this._normalAcceleration = options.normalAcceleration ?? normalAcceleration;
        this._boostAcceleration = options.boostAcceleration ?? boostAcceleration;
        this._speed = options.speed ?? speed;
        this._jumpPower = options.jumpPower ?? jumpPower;
        this._minHeight = options.minHeight ?? minHeight;
        this._maxHeight = options.maxHeight ?? maxHeight;

        this._position = options.position ?? position;

    }
    get position() {
        return this._position;
    }
    get rotation() {
        return this._rotation;
    }

    public update(): void {
        const is = this._controls.down;
        const deltaTime = this._time.deltaTime;
        const turnDirection = Number(is.strafeLeft) - Number(is.strafeRight);
        this._rotation += turnDirection * PLAYER_ROTATION_SPEED * deltaTime;

        const moveDirection = Number(is.backward) - Number(is.forward);
        if (moveDirection !== 0) {
            this._speed = is.boost ? this._boostAcceleration : this._normalAcceleration;
            const distance = moveDirection * this._speed * this._time.deltaTime;
            console.log(distance);
            this._position.cur.x += Math.sin(this._rotation) * distance;
            this._position.cur.z += Math.cos(this._rotation) * distance;
        }
        // jump 
        if (is.jump) {
            this._position.cur.y += this._jumpPower * deltaTime;
        } else {
            this._position.cur.y -= (this._jumpPower / 4) * deltaTime;
        }

        // clipping out of bounds 
        if (this._position.cur.y < this._minHeight || this._position.cur.y >= this._maxHeight) {
            this._position.cur.y = Math.max(Math.min(this._position.cur.y, this._maxHeight), this._minHeight);
        }

        const terrainHeight = State.getInstance().Terrains.getHeightAt(vec2.fromValues(
            this._position.cur.x,
            this._position.cur.z
        ));

        // update height offset
        if (terrainHeight !== undefined) {
            const groundOffset = PLAYER_RADIUS + PLAYER_CAPSULE_LENGTH * 0.5;
            this._position.cur.y = easeTowards(
                this._position.cur.y,
                terrainHeight + groundOffset,
                deltaTime
            );
        }

        this._position.delta.set(
            this._position.cur.x - this._position.prev.x,
            this._position.cur.y - this._position.prev.y,
            this._position.cur.z - this._position.prev.z
        );
        this._position.prev.copy(this._position.cur);
        this._speed = Math.hypot(this._position.delta.x, this._position.delta.z);
    }




}