import * as THREE from 'three';
import { State } from '../../state/state';
import type { WaterState } from '../../state/water/water';
import { createWaterMaterial } from '../materials/waterMaterial';
import { View } from '../view';
import type { Time } from '../../state/time';
import type { Sun } from '../sun/sun';
import type { CameraState } from '../../state/camera/camera';
import type { TerrainState } from '../../state/terrain/terrain';
import { vec2 } from 'gl-matrix';

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
        this.listenForTerrainShoreline(state.Terrains);

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
        this._material.uniforms.uTerrainCenter.value = new THREE.Vector2();
        this._material.uniforms.uTerrainSize.value = 1;
        const initialNoiseTexture = new THREE.DataTexture(
            new Uint8Array([128]),
            1,
            1,
            THREE.RedFormat
        );
        initialNoiseTexture.needsUpdate = true;
        this._material.uniforms.uNoiseTexture.value = initialNoiseTexture;
        this.setWaveUniforms();
        this.generateNoiseTexture();

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

    private listenForTerrainShoreline(terrains: State['Terrains']) {
        const handleTerrain = (terrain: TerrainState) => {
            const center = vec2.fromValues(this._state.position[0], this._state.position[2]);
            if (!terrain.contains(center)) {
                return;
            }

            if (terrain.isReady) {
                this.setTerrainBounds(terrain);
                return;
            }

            terrain.events.once('ready', () => this.setTerrainBounds(terrain));
        };

        terrains.events.on('create', handleTerrain);
        for (const terrain of terrains.terrains.values()) {
            handleTerrain(terrain);
        }
    }

    private setTerrainBounds(terrain: TerrainState) {
        this._material.uniforms.uTerrainCenter.value.set(terrain.center[0], terrain.center[1]);
        this._material.uniforms.uTerrainSize.value = terrain.size;
    }

    private generateNoiseTexture() {
        const worker = new Worker(
            new URL('../../workers/waterNoiseWorker.ts', import.meta.url),
            { type: 'module' }
        );

        worker.onmessage = (event: MessageEvent<{ width: number; height: number; buffer: ArrayBuffer }>) => {
            const { width, height, buffer } = event.data;
            const texture = new THREE.DataTexture(
                new Uint8Array(buffer),
                width,
                height,
                THREE.RedFormat
            );
            texture.magFilter = THREE.LinearFilter;
            texture.minFilter = THREE.LinearFilter;
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.generateMipmaps = false;
            texture.needsUpdate = true;

            const previousTexture = this._material.uniforms.uNoiseTexture.value as THREE.DataTexture;
            this._material.uniforms.uNoiseTexture.value = texture;
            previousTexture.dispose();
            worker.terminate();
        };

        worker.onerror = (event) => {
            console.error('Failed to generate the water ripple noise texture.', event.message);
            worker.terminate();
        };

        worker.postMessage({ width: 128, height: 128, noiseScale: 0.08 });
    }

}