import * as THREE from 'three';
import type { RendererOptions } from './types';
import { DEFAULT_RENDERER_OPTIONS } from './default'
import { View } from '../view';
import { Camera } from '../camera/camera';
import type { Viewport } from '../../state/viewport/viewport';
import { State } from '../../state/state';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { BokehPass } from 'three/addons/postprocessing/BokehPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { VignetteShader } from 'three/addons/shaders/VignetteShader.js';


export class Renderer {

    private _renderer!: THREE.WebGLRenderer;
    private _canvas: HTMLCanvasElement;

    private _viewport: Viewport;
    private _camera: Camera;
    private _scene: THREE.Scene;
    private _composer!: EffectComposer;

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

        renderer.setPixelRatio(this._viewport.pixelRatio);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1;
        renderer.setSize(this._viewport.width, this._viewport.height);
        renderer.shadowMap.enabled = true;
        this._renderer = renderer;

        const composer = new EffectComposer(renderer);
        composer.setPixelRatio(this._viewport.pixelRatio);
        composer.setSize(this._viewport.width, this._viewport.height);
        composer.addPass(new RenderPass(this._scene, this._camera.instance));
        composer.addPass(new BokehPass(this._scene, this._camera.instance, {
            focus: 50.0,
            aperture: 0.000001,
            maxblur: 0.001,
        }));
        composer.addPass(new UnrealBloomPass(
            new THREE.Vector2(this._viewport.width, this._viewport.height),
            0.25,
            0.5,
            0.85,
        ));
        const vignette = new ShaderPass(VignetteShader);
        vignette.uniforms['offset'].value = 1.05;
        vignette.uniforms['darkness'].value = 0.22;
        composer.addPass(vignette);
        this._composer = composer;
    }
    public update(): void {
        this._composer.render();
    }
    public resize(): void {
        this._renderer.setPixelRatio(this._viewport.pixelRatio);
        this._renderer.setSize(this._viewport.width, this._viewport.height);
        this._composer.setPixelRatio(this._viewport.pixelRatio);
        this._composer.setSize(this._viewport.width, this._viewport.height);
    }


}