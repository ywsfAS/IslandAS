import * as THREE from 'three';
import { State } from '../../state/state';
import type { WaterState } from '../../state/water/water';
import { createWaterMaterial } from '../materials/waterMaterial';
import { View } from '../view';
import type { Time } from '../../state/time';
import type { Sun } from '../sun/sun';
import type { CameraState } from '../../state/camera/camera';

export class Water {

    private _geometry!: THREE.PlaneGeometry;
    private _material!: THREE.ShaderMaterial;
    private _mesh!: THREE.Mesh;

    private readonly _state: WaterState;
    private readonly _scene: THREE.Scene;
    private readonly _time: Time;
    private readonly _sun: Sun;
    private readonly _camera: CameraState;


    constructor() {

        const state = State.getInstance();
        const view = View.getInstance();

        this._state = state.water;
        this._scene = view.scene;
        this._time = state.time;
        this._sun = view.sun;
        this._camera = state.camera;

        this.setGeometry();
        this.setMaterial();
        this.setMesh();

    }

    public setGeometry() {

        this._geometry = new THREE.PlaneGeometry(
            this._state.width,
            this._state.height,
            this._state.widthSegments,
            this._state.heightSegements
        )
        this._geometry.rotateX(-Math.PI / 2);
    }

    public setMaterial() {
        this._material = createWaterMaterial();

        this._material.uniforms.uTime.value = this._time.elapsedTime;
        this.setWaveUniforms();

    }
    public setMesh() {
        const position = this._state.position;
        this._mesh = new THREE.Mesh(this._geometry, this._material);
        this._mesh.position.set(position[0], position[1], position[2]);
        this._scene.add(this._mesh);
    }

    public update() {
        this._material.uniforms.uTime.value = this._time.elapsedTime;
        this.setWaveUniforms();
        this._material.uniforms.uDirectionLight.value = this._sun.lightDirection;
        this._material.uniforms.uSunColor.value = this._sun.color;
        this._material.uniforms.uSunIntensity.value = this._sun.intensity;
        this._material.uniforms.uCameraPosition.value = this._camera.position;

    }

    private setWaveUniforms() {
        this._material.uniforms.uAngularFrequency.value = this._state.angularFrequency;
        this._material.uniforms.uSpatialFrequency.value = this._state.spatialFrequency;
        this._material.uniforms.uWaveAmplitude.value = this._state.waveAmplitude;
        this._material.uniforms.uDirection1.value = this._state.directions[0];
        this._material.uniforms.uDirection2.value = this._state.directions[1];
        this._material.uniforms.uDirection3.value = this._state.directions[2];
    }

}