import type { ZoneConfig } from "./types";
import { DEFAULT_ZONE_CONFIGS } from './default';
import type { vec2 } from "gl-matrix";
import type { PlayerState } from "../player/player";
import { State } from "../state";
import { EventEmitter } from "events";
import type { AudioManager } from "../audio/audioManager";
import type { AudioControls } from "../audio/types";

export abstract class ZoneState {

    protected _id: number;
    protected _title: string;
    protected _subtitle: string;
    protected _radius: number;
    protected _transitionRadius: number;
    protected _center: vec2;
    protected _audioUrl: string;

    protected _blend: number = 0;
    protected _isInside: boolean = false;
    protected _isApproaching: boolean = false;

    protected readonly _player: PlayerState;
    protected readonly _events: EventEmitter = new EventEmitter();
    protected readonly _audio: AudioManager;
    protected _currentAudioControls!: AudioControls;

    constructor(id: number, options: Partial<ZoneConfig> = {}) {

        this._id = id;

        const state = State.getInstance();
        this._player = state.player;
        this._audio = state.audioManager;

        const { audioUrl, title, subtitle, radius, transitionRadius, center } = DEFAULT_ZONE_CONFIGS;

        this._title = options.title ?? title;
        this._subtitle = options.subtitle ?? subtitle;
        this._radius = options.radius ?? radius;
        this._transitionRadius = options.transitionRadius ?? transitionRadius;
        this._center = options.center ?? center;
        this._audioUrl = options.audioUrl ?? audioUrl;

        this.registerAudio();

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
    get title() {
        return this._title;
    }
    get subtitle() {
        return this._subtitle;
    }
    get events(): EventEmitter {
        return this._events;
    }

    protected onEnter(): void {
    };
    protected onApproach(): void {
        const mainControls = State.getInstance().mainAudioControls;

        if (!this._currentAudioControls) return;
        // the curren sound gets louder
        const currentVol = (2 * this._blend - 1);
        this._currentAudioControls.setVolume(currentVol);

        if (!mainControls) return;
        // the main sound fade using blend value
        const mainVol = ((1 - this._blend) / 0.5) - 1;
        mainControls.setVolume(mainVol);
    }
    protected onExit(): void {
        const mainControls = State.getInstance().mainAudioControls;
        if (!mainControls) return;
        mainControls.setVolume(1);
        this._currentAudioControls.stop();


    };
    protected registerAudio(): void {
        this._events.on('onApproachOnce', async () => {
            this._currentAudioControls = await this._audio.play(this._audioUrl);
        },)
    }

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
            this._events.emit('onEnter');
        }
        if (this._isInside && distance > this._radius + this._transitionRadius) {
            this._isInside = false;
            this.onExit();
            this._events.emit('onExit');
        }
        // runs everything the player is inside the transition zone 
        if (!this._isInside && distance <= this._transitionRadius + this.radius && distance > this._radius) {
            this.onApproach();
            this._events.emit('onApproach');
        }
        // runs once in a transition zone
        if (!this._isApproaching && distance <= this._transitionRadius + this.radius && distance > this._radius) {
            this._isApproaching = true;
            this._events.emit('onApproachOnce');
        }
        if (this._isApproaching && distance > this._transitionRadius + this._radius) {
            this._isApproaching = false;
        }

    };

}