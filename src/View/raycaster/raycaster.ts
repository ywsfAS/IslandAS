import { EventEmitter } from 'events';
import * as THREE from 'three';
import { State } from '../../state/state';
import type { Controls } from '../../state/controls/controls';
import { View } from '../view';
import type { Camera } from '../camera/camera';
import type { Viewport } from '../../state/viewport/viewport';

export class Raycaster {

    private readonly _raycaster: THREE.Raycaster;
    private readonly _objs: THREE.Object3D[] = [];
    private readonly _events: EventEmitter = new EventEmitter();

    private readonly _controls: Controls;
    private readonly _camera: Camera;
    private readonly _viewport: Viewport;


    constructor() {
        const state = State.getInstance();
        const view = View.getInstance();

        this._controls = state.controls;
        this._camera = view.camera;
        this._viewport = state.viewport;


        this._raycaster = this.setRaycaster();

    }

    public subscribe(obj: THREE.Object3D) {
        if (!obj) {
            throw new Error('Cannot subscribe an undefined object to the raycaster.');
        }

        this._objs.push(obj);
    }

    public setRaycaster(): THREE.Raycaster {

        const raycaster = new THREE.Raycaster();
        return raycaster;
    }
    public update() {
        const mouse = this._controls.cursor.position;

        const height = this._viewport.height;
        const width = this._viewport.width;

        if (width <= 0 || height <= 0) {
            return;
        }

        const normalizedMouse = new THREE.Vector2(
            (mouse.x / width) * 2 - 1,
            1 - (mouse.y / height) * 2,
        );

        const camera = this._camera.instance;
        camera.updateMatrixWorld(true);
        this._raycaster.setFromCamera(normalizedMouse, camera);
        const intersectedObjs: THREE.Intersection[] = this._raycaster.intersectObjects(this._objs, true);

        if (intersectedObjs.length !== 0) {
            console.log("there is intersection ");
        }

    }


}