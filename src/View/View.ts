import * as THREE from 'three';
import { Camera } from './Camera/camera';
import { Renderer } from './Renderer/renderer';
export class View {

    private static instance: View;

    private _scene: THREE.Scene;
    private _camera: Camera;
    private _renderer: Renderer;

    public static getInstance(): View {
        return View.instance ?? new View();
    }

    private constructor() {
        View.instance = this;

        this._scene = new THREE.Scene();
        this._camera = new Camera(new THREE.PerspectiveCamera());
        this._renderer = new Renderer();
    }
    get scene() {
        return this._scene;
    }
    get camera() {
        return this._camera;
    }
    get renderer() {
        return this._renderer;
    }

    public update() {
        this._renderer.update();
    }
    public resize() {
        this._camera.resize();
        this._renderer.resize();
    }

}