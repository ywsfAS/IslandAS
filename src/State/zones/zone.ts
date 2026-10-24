import type { ZoneConfig } from "./types";
import { DEFAULT_ZONE_CONFIGS } from './default';
import type { vec2 } from "gl-matrix";
import type { PlayerState } from "../player/player";
import { State } from "../state";

export abstract class ZoneState {

    protected _id: number;
    protected _title: string;
    protected _subtitle: string;
    protected _radius: number;
    protected _transitionRadius: number;
    protected _center: vec2;

    protected _blend: number = 0;
    protected _isInside: boolean = false;

    protected readonly _player: PlayerState;

    constructor(id: number, options: Partial<ZoneConfig> = {}) {

        this._id = id;

        const state = State.getInstance();
        this._player = state.player;

        const { title, subtitle, radius, transitionRadius, center } = DEFAULT_ZONE_CONFIGS;

        this._title = options.title ?? title;
        this._subtitle = options.subtitle ?? subtitle;
        this._radius = options.radius ?? radius;
        this._transitionRadius = options.transitionRadius ?? transitionRadius;
        this._center = options.center ?? center;

    }
    public blend(): number {
        return this._blend;
    }
    public isInside(): boolean {
        return this._isInside;
    }
    get id(): number {
        return this._id;
    }
    get radius() {
        return this._radius;
    }
    get center() {
        return this._center;
    }

    protected abstract onEnter(): void;
    protected abstract onExit(): void;

    public update(): void {
        const xp = this._player.position.cur.x;
        const zp = this._player.position.cur.z;

        const xc = this._center[0];
        const yc = this._center[1];

        const distance = Math.sqrt(Math.pow(xp - xc, 2) + Math.pow(zp - yc, 2));
        const blend = Math.max(0, Math.min(1, (distance - this._radius) / this._transitionRadius));
        const smoothBlend = 1 - blend * blend * (3 - 2 * blend);
        this._blend = smoothBlend;


        // decides if it is onEnter or onExit event
        if (!this._isInside && distance <= this._radius) {
            this._isInside = true;
            this.onEnter();
        }
        if (this._isInside && distance > this._radius + this._transitionRadius) {
            this._isInside = false;
            this.onExit();
        }

    };

}