import { CSS3DRenderer } from 'three/examples/jsm/Addons.js';
import { View } from '../view';
import { State } from '../../state/state';
import type { Camera } from '../camera/camera';
import type { Viewport } from '../../state/viewport/viewport';
import type { Scene } from 'three';

export class cssRenderer {

    private _cssRenderer!: CSS3DRenderer;
    private _camera: Camera;
    private _scene: Scene;
    private _viewport: Viewport;

    constructor() {

        const view = View.getInstance();
        const state = State.getInstance();

        this._camera = view.camera;
        this._viewport = state.viewport;
        this._scene = view.scene;

        this.setRenderer();
    }
    public setRenderer() {

        const renderer = new CSS3DRenderer();

        // add config to the css renderer
        renderer.setSize(this._viewport.width, this._viewport.height);
        renderer.domElement.style.position = 'absolute';
        renderer.domElement.style.top = '0';

        // attach it to dom
        document.body.appendChild(renderer.domElement);

        this._cssRenderer = renderer;
    }

    public update() {
        console.log("here we are updating the cssRenderer");
        this._cssRenderer.render(this._scene, this._camera.instance);
    }



}