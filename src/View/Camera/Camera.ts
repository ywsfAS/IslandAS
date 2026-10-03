import * as THREE from 'three';
export class Camera {
    private _camera: THREE.Camera;

    constructor(camera: THREE.Camera) {
        this._camera = camera;
    }
    get instance() {
        return this._camera;
    }

}