import { EventEmitter } from 'events';
import * as THREE from 'three';
import { State } from '../../state/state';
import type { Controls } from '../../state/controls/controls';
import { View } from '../view';
import type { Camera } from '../camera/camera';
import type { Viewport } from '../../state/viewport/viewport';

export class Raycaster {

    private readonly _raycaster: THREE.Raycaster;
    private readonly _objs = new Map<string, THREE.Object3D>();
    private readonly _idsByObject = new Map<THREE.Object3D, string>();
    private _hoveredIds = new Set<string>();
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
    get events() {
        return this._events;
    }

    public subscribe(
        obj: THREE.Object3D,
        fn: (intersection: THREE.Intersection | null) => void,
        id: string,
    ): void {
        if (!obj) {
            throw new Error('Cannot subscribe an undefined object to the raycaster.');
        }
        if (!id) {
            throw new Error('Raycaster subscriptions require an id.');
        }

        const existingObject = this._objs.get(id);
        if (existingObject) {
            this._idsByObject.delete(existingObject);
        }

        this._objs.set(id, obj);
        this._idsByObject.set(obj, id);
        this._events.removeAllListeners(id);
        this._events.on(id, fn);
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
        const intersections = this._raycaster.intersectObjects([...this._objs.values()], true);
        const intersectionsById = new Map<string, THREE.Intersection>();

        for (const intersection of intersections) {
            let object: THREE.Object3D | null = intersection.object;

            while (object) {
                const id = this._idsByObject.get(object);
                if (id) {
                    if (!intersectionsById.has(id)) intersectionsById.set(id, intersection);
                    break;
                }

                object = object.parent;
            }
        }

        for (const id of this._hoveredIds) {
            if (!intersectionsById.has(id)) this._events.emit(id, null);
        }

        for (const [id, intersection] of intersectionsById) {
            if (!this._hoveredIds.has(id)) this._events.emit(id, intersection);
        }

        this._hoveredIds = new Set(intersectionsById.keys());

    }


}