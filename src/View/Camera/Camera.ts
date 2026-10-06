import * as THREE from 'three';
import type { CameraOptions } from './types';
import { DEFAULT_CAMERA_CONFIG } from './default';
import type { Viewport } from '../../state/viewport/viewport';
import { State } from '../../state/state';
import type { Player } from '../../state/player/player';

export class Camera {
    private readonly _camera: THREE.PerspectiveCamera;
    private readonly _viewport: Viewport;

    private readonly _diff: number = 10;

    private readonly _player: Player;

    constructor(options: Partial<CameraOptions> = {}) {

        const state = State.getInstance();

        this._viewport = state.viewport;
        this._player = state.player;

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

        const curr = this._player.position.cur;
        this._camera.position.set(curr.x, curr.y + this._diff, curr.z + this._diff);
        this._camera.lookAt(curr);
    }


}