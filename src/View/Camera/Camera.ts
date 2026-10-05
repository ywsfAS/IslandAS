import * as THREE from 'three';
import type { CameraOptions } from './types';
import { DEFAULT_CAMERA_CONFIG } from './default';
import type { Viewport } from '../../State/viewport/viewport';
import { State } from '../../State/state';

export class Camera {
    private _camera: THREE.PerspectiveCamera;
    private _viewport: Viewport;

    constructor(options: Partial<CameraOptions> = {}) {

        const state = State.getInstance();
        this._viewport = state.viewport;

        const { far, near, fov } = DEFAULT_CAMERA_CONFIG;

        this._camera = new THREE.PerspectiveCamera(
            options.fov ?? fov,
            this._viewport.aspect,
            options.near ?? near,
            options.far ?? far
        );
    }
    get instance() {
        return this._camera;
    }
    public resize() {
        this._camera.aspect = this._viewport.aspect;
        this._camera.updateProjectionMatrix();
    }

}