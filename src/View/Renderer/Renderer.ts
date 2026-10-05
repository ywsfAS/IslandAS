import * as THREE from 'three';
import type { RendererOptions } from './types';
import { DEFAULT_RENDERER_OPTIONS } from './default'
import { View } from '../view';
import { Camera } from '../camera/camera';
import type { Viewport } from '../../state/viewport/viewport';
import { State } from '../../state/state';


export class Renderer {

    private _renderer!: THREE.WebGLRenderer;
    private _canvas: HTMLCanvasElement;

    private _viewport: Viewport;
    private _camera: Camera;
    private _scene: THREE.Scene;

    constructor(options: Partial<RendererOptions> = {}) {

        const view = View.getInstance();
        const state = State.getInstance();

        this._camera = view.camera;
        this._scene = view.scene;
        this._viewport = state.viewport;

        const { canvas } = DEFAULT_RENDERER_OPTIONS;
        this._canvas = options.canvas ?? canvas;

        this.setRenderer();

    };
    private setRenderer(): void {

        const renderer = new THREE.WebGLRenderer({
            canvas: this._canvas
        })

        renderer.setSize(this._viewport.width, this._viewport.height);
        this._renderer = renderer;

    }
    public update(): void {
        this._renderer.render(this._scene, this._camera.instance);
    }
    public resize(): void {
        this._renderer.setSize(this._viewport.width, this._viewport.height)
    }


}