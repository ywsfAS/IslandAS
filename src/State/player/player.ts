import type { PlayerOptions, Position } from './types';
import { DEFAULT_PLAYER_OPTIONS } from './default';
export class Player {

    private _rotation: number;
    private _normalAcceleration: number;
    private _boostAcceleration: number;
    private _speed: number;

    private _position: Position;

    constructor(options: Partial<PlayerOptions> = {}) {

        const { rotation, normalAcceleration, boostAcceleration, speed, position } = DEFAULT_PLAYER_OPTIONS;

        this._rotation = options.rotation ?? rotation;
        this._normalAcceleration = options.normalAcceleration ?? normalAcceleration;
        this._boostAcceleration = options.boostAcceleration ?? boostAcceleration;
        this._speed = options.speed ?? speed;

        this._position = options.position ?? position;

    }

    public update(): void {
        // this section will fill player movement using controles
        console.log("player state is updated ...");
    }




}