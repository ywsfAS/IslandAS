import { Model } from "../../model";
import type { fireOptions } from "./types";
import { DEFAULT_FIRE_OPTIONS } from './default';
import * as THREE from 'three';
import type { Time } from "../../../../state/time";
import { State } from "../../../../state/state";

export class Fire extends Model {
    private _mixer: THREE.AnimationMixer;
    private readonly _time: Time;

    constructor(options: fireOptions = {}) {
        super(DEFAULT_FIRE_OPTIONS, options);

        const state = State.getInstance();
        this._time = state.time;
    }
    public override setMeshMaterial(mesh: THREE.Mesh) { };
    public override onLoad() {
        const mixer = new THREE.AnimationMixer(this._group);
        const clip = this._animations[0];

        const action = mixer.clipAction(clip);
        action.setLoop(THREE.LoopRepeat, Infinity);

        action.play();

        this._mixer = mixer;
    }
    public override update() {
        if (!this._mixer) return;
        this._mixer.update(this._time.deltaTime);
    }

}