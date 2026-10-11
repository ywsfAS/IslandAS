import * as THREE from 'three';
import type { SunState } from '../../state/sun/sun';
import { State } from '../../state/state';
import type { SunOptions } from './types';
import { DEFAULT_SUN_CONFIG } from './default';
import { createSunMaterial } from '../materials/sunMaterial';

export class Sun {

    private _segments: number;
    private _geometry!: THREE.SphereGeometry;
    private _material!: THREE.ShaderMaterial;
    private _mesh!: THREE.Mesh;

    private readonly _state: SunState;

    constructor(options: Partial<SunOptions> = {}) {

        const { segments } = DEFAULT_SUN_CONFIG;

        const state = State.getInstance();
        this._state = state.sun;
        this._segments = options.segments ?? segments;


        this.setGeometry();
        this.setMaterial();
        this.setMesh();

    }


    public setGeometry() {

        this._geometry = new THREE.SphereGeometry(
            this._state.radius,
            this._segments,
            this._segments

        );
    }
    public setMaterial() {

        this._material = createSunMaterial();
        this._material.uniforms.uTime.value = 0;
    }
    public setMesh() {

        this._mesh = new THREE.Mesh(this._geometry, this._material);
    }

    public update() {
        console.log("sun view is updating");
        this._material.uniforms.uTime.value = this._state.time;

    }



}