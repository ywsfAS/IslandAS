import * as THREE from 'three';
import type { SunState } from '../../state/sun/sun';
import { State } from '../../state/state';
import { View } from '../view';
import type { SunOptions } from './types';
import { DEFAULT_SUN_CONFIG } from './default';
import { createSunMaterial } from '../materials/sunMaterial';

export class Sun {

    private _segments: number;
    private _geometry!: THREE.SphereGeometry;
    private _material!: THREE.ShaderMaterial;
    private _mesh!: THREE.Mesh;

    private _light!: THREE.DirectionalLight;
    private _lightDirection: THREE.Vector3;
    private readonly _sunColor = new THREE.Color(0xfff0d0);
    private readonly _sunsetColor = new THREE.Color("#e7a786");
    private readonly _daylightColor = new THREE.Color(0xfff0d0);

    private readonly _state: SunState;
    private readonly _scene: THREE.Scene;

    constructor(options: Partial<SunOptions> = {}) {

        const { segments } = DEFAULT_SUN_CONFIG;

        const state = State.getInstance();
        const view = View.getInstance();

        this._state = state.sun;
        this._scene = view.scene;
        this._segments = options.segments ?? segments;
        this._lightDirection = new THREE.Vector3(0, 0, 0);


        this.setGeometry();
        this.setMaterial();
        this.setMesh();
        this.setLight();

    }
    get lightDirection() {
        return this._lightDirection;
    }
    get intensity() {
        return this._state.intensity;
    }
    get color() {
        return this._sunColor;
    }

    public setLight() {
        const colorState = this._state.color;
        const intensity = this._state.intensity;
        const color = new THREE.Color(colorState[0], colorState[1], colorState[2]);
        this._light = new THREE.DirectionalLight(color, intensity);

        // target of light is at center of the world
        const center = this._state.center;
        this._light.target.position.set(center[0], center[1], center[2]);

        this._scene.add(this._light);
        this._scene.add(this._light.target);
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
    }
    public setMesh() {

        this._mesh = new THREE.Mesh(this._geometry, this._material);
        this._scene.add(this._mesh);
    }

    public update() {
        const position = this._state.position;
        const center = this._state.center;
        this._mesh.position.set(position[0], position[1], position[2]);
        this._light.position.set(position[0], position[1], position[2]);

        // update the light direction vector
        this._lightDirection.subVectors(
            new THREE.Vector3(position[0], position[1], position[2]),
            new THREE.Vector3(center[0], center[1], center[2])
        ).normalize();

        const daylight = THREE.MathUtils.smoothstep(this._lightDirection.y, -0.08, 0.35);
        this._sunColor.lerpColors(this._sunsetColor, this._daylightColor, daylight);

        this._material.uniforms.uColor.value = this._sunColor;
        this._light.color.copy(this._sunColor);

    }



}