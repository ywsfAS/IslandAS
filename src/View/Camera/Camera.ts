import * as THREE from 'three';
import type { CameraOptions } from './types';
import { DEFAULT_CAMERA_CONFIG } from './default';
import type { Viewport } from '../../state/viewport/viewport';
import { State } from '../../state/state';
import type { PlayerState } from '../../state/player/player';
import type { CameraState } from '../../state/camera/camera';
import { vec2 } from 'three/tsl';

export class Camera {
    private readonly _camera: THREE.PerspectiveCamera;
    private readonly _viewport: Viewport;

    private readonly _diff: number = 10;

    private readonly _state: CameraState;

    constructor(options: Partial<CameraOptions> = {}) {

        const state = State.getInstance();

        this._viewport = state.viewport;
        this._state = state.camera;

        const { far, near, fov } = DEFAULT_CAMERA_CONFIG;

        this._camera = new THREE.PerspectiveCamera(
            options.fov ?? fov,
            this._viewport.aspect,
            options.near ?? near,
            options.far ?? far
        );
        this._camera.position.set(0, 10, 10);
    }
    get instance() {
        return this._camera;
    }
    public resize() {
        this._camera.aspect = this._viewport.aspect;
        this._camera.updateProjectionMatrix();
    }

    public update(): void {

        const [x, y, z] = this._state.position;
        const [qx, qy, qz, qw] = this._state.quaterion;

        this._camera.position.set(x, y, z);
        this._camera.quaternion.set(qx, qy, qz, qw)
    }


}