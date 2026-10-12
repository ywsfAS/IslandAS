import * as THREE from 'three';
import type { Sun } from '../sun/sun';
import { createSkyMaterial } from '../materials/skyMaterial';

export class Sky {

    private readonly _mesh: THREE.Mesh;
    private readonly _material: THREE.ShaderMaterial;

    constructor(
        private readonly _scene: THREE.Scene,
        private readonly _camera: THREE.Camera,
        private readonly _sun: Sun
    ) {
        this._material = createSkyMaterial();
        this._mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 16), this._material);
        this._mesh.frustumCulled = false;
        this._mesh.renderOrder = -1;
        this._scene.add(this._mesh);
        this.update();
    }

    public update() {
        this._mesh.position.copy(this._camera.position);
        this._material.uniforms.uSunDirection.value.copy(this._sun.lightDirection);
    }
}
