import type { Controls } from "../controls/controls";
import type { Player } from "../player/player";
import { State } from "../state";
import { DEFAULT_CAMERA_STATE_CONFIG } from './default';
import type { Viewport } from "../viewport/viewport";
import type { CameraStateOptions } from "./types";
import { mat4, quat2, vec3 } from 'gl-matrix';


export class CameraState {

    private _phi: number;
    private _theta: number;

    private _minPhi: number = 0.1;
    private _maxPhi: number = Math.PI - 0.1;
    private _verOffset: number = 10;

    private _distance: number;

    private _position: vec3;
    private _quaterion: quat2;

    private readonly _player: Player;
    private readonly _viewport: Viewport;
    private readonly _controls: Controls;

    constructor(options: Partial<CameraStateOptions> = {}) {
        const { initPhi, initTheta, distance } = DEFAULT_CAMERA_STATE_CONFIG;

        const state = State.getInstance();

        this._player = state.player;
        this._viewport = state.viewport;
        this._controls = state.controls;

        this._phi = options.initPhi ?? initPhi;
        this._theta = options.initTheta ?? initTheta;

        this._quaterion = quat2.create();
        this._position = vec3.create();

        this._distance = options.distance ?? distance;


    }
    get position(): Readonly<vec3> {
        return this._position;
    }
    get quaterion(): Readonly<quat2> {
        return this._quaterion;
    }

    public update() {
        // if cursor is down we set the angles
        const cursor = this._controls.cursor;
        if (cursor.down) {

            const normilized = this._viewport.normilize(cursor.origin);
            this._phi -= normilized.y * 3;
            this._theta -= normilized.x * 3;

            // clap value in the accpeted range
            this._phi = Math.min(Math.max(this._phi, this._minPhi), this._maxPhi);

        }
        // calculate position from spheric coord
        const sinPhiRadius = Math.sin(this._phi) * this._distance
        const sphericalPositionOfPlayerFromCamera = vec3.fromValues(
            sinPhiRadius * Math.sin(this._theta),
            Math.cos(this._phi) * this._distance,
            sinPhiRadius * Math.cos(this._theta)
        )
        // camera position relative to the world
        this._position = vec3.fromValues(
            this._player.position.cur.x + sphericalPositionOfPlayerFromCamera[0],
            this._player.position.cur.y + sphericalPositionOfPlayerFromCamera[1],
            this._player.position.cur.z + sphericalPositionOfPlayerFromCamera[2],
        );
        // rotation calculation
        // get target player top 
        const target = vec3.fromValues(
            this._player.position.cur.x,
            this._player.position.cur.y + this._verOffset,
            this._player.position.cur.z,
        )

        const transformMatrix = mat4.create();
        mat4.targetTo(transformMatrix, this._position, target, vec3.fromValues(0, 1, 0));

        quat2.fromMat4(this._quaterion, transformMatrix);








    }








}