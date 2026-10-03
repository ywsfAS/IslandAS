import * as THREE from 'three';
import { Camera } from './Camera/Camera';
export class View {

    public static instance: View;

    private _scene!: THREE.Scene;
    private _camera!: Camera;

    public static getInstance(): View {
        return View.instance;
    }

    constructor() {

        if (View.instance) {
            return View.instance;
        }

        View.instance = this;

        this._scene = new THREE.Scene();

        this._camera = new Camera(new THREE.PerspectiveCamera());
    }
    get scene() {
        return this._scene;
    }
    get camera() {
        return this._camera;
    }

}