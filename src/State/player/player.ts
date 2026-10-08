import type { PlayerOptions, Position } from './types';
import { DEFAULT_PLAYER_OPTIONS } from './default';
import { State } from '../state';
import type { Controls } from '../controls/controls';
import type { Time } from '../time';
import { Vector3 } from 'three';
import { View } from '../../view/view';

export class Player {

    private _rotation: number;
    private _normalAcceleration: number;
    private _boostAcceleration: number;
    private _speed: number;

    private _position: Position;
    private _controls: Controls;
    private _time: Time;
    private _camera: any;


    constructor(options: Partial<PlayerOptions> = {}) {

        const state = State.getInstance();
        const view = View.getInstance();

        this._controls = state.controls;
        this._time = state.time;
        this._camera = view.camera;


        const { rotation, normalAcceleration, boostAcceleration, speed, position } = DEFAULT_PLAYER_OPTIONS;

        this._rotation = options.rotation ?? rotation;
        this._normalAcceleration = options.normalAcceleration ?? normalAcceleration;
        this._boostAcceleration = options.boostAcceleration ?? boostAcceleration;
        this._speed = options.speed ?? speed;

        this._position = options.position ?? position;

    }
    get position() {
        return this._position;
    }
    get rotation() {
        return this._rotation;
    }

    public update(): void {
        // this section will fill player movement using controles
        const is = this._controls.down;
        const isAnyKeyPressed = is.forward || is.strafeRight || is.backward || is.strafeLeft;
        if (isAnyKeyPressed) {

            if (is.forward) {

                if (is.strafeLeft) {
                    this._rotation += Math.PI * 0.25;
                }
                else if (is.strafeRight) {
                    this._rotation -= Math.PI * 0.25;
                }
            }
            else if (is.backward) {
                if (is.strafeLeft) {
                    this._rotation += Math.PI * 0.75;
                }
                else if (is.strafeRight) {
                    this._rotation -= Math.PI * 0.75;
                }
                else {
                    this._rotation -= Math.PI;
                }

            }
            // TODO : if we rotate the object no mouvement at all 
            else if (is.strafeLeft) {
                this._rotation += Math.PI * 0.5;
                return;
            }
            else if (is.strafeRight) {
                this._rotation -= Math.PI * 0.5;
                return;
            }

            const speed = is.boost ? this._boostAcceleration : this._normalAcceleration;

            const x = Math.sin(this._rotation) * this._time.deltaTime * speed;
            const z = Math.cos(this._rotation) * this._time.deltaTime * speed;

            const curr = this._position.cur;
            const prev = this._position.prev;

            curr.x -= x;
            curr.z -= z;

            this._position.delta = new Vector3(curr.x - prev.x, curr.y - prev.y, curr.z - prev.z);
            this._position.prev = new Vector3(curr.x, curr.y, curr.z);

            this._speed = this._position.delta.length();


        }
    }




}