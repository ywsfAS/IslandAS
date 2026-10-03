import * as THREE from 'three';
import type { RendererOptions } from './types';
import { DEFAULT_RENDERER_OPTIONS } from './Default';
import { View } from '../View';
import { Camera } from '../Camera/Camera';


export class Renderer {

    private _renderer!: THREE.WebGLRenderer;
    private _canvas: HTMLCanvasElement;
    private _width: number;
    private _height: number;

    private _camera: Camera;
    private _scene: THREE.Scene;

    constructor(options: Partial<RendererOptions> = {}) {

        const view = View.getInstance();

        this._camera = view.camera;
        this._scene = view.scene;

        const { canvas, width, height } = DEFAULT_RENDERER_OPTIONS;
        this._canvas = options.canvas ?? canvas;
        this._width = options.width ?? width;
        this._height = options.height ?? height;


        this.setRenderer();

    };

    private setRenderer(): void {

        const renderer = new THREE.WebGLRenderer({
            canvas: this._canvas
        })

        renderer.setSize(this._width, this._height);

        this._renderer = renderer;

    }
    public update(): void {
        this._renderer.render(this._scene, this._camera.instance);
    }
    public resize(): void {
        this._renderer.setSize(this._width, this._height)
    }


}