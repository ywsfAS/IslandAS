import { Font, FontLoader, TextGeometry, type TextGeometryParameters } from "three/examples/jsm/Addons.js";
import { View } from "../view";
import { DEFAULT_TEXT_CONFIGS } from './default';
import type { TextOptions } from './types';
import * as THREE from 'three';
import type { TerrainState } from "../../state/terrain/terrain";
import { vec2 } from "gl-matrix";
import type { TerrainsState } from "../../state/terrains/terrains";
import { State } from "../../state/state";
import { createNeonMaterial } from "../materials/neonTextMaterial";
import type { CameraState } from "../../state/camera/camera";
import type { SunState } from "../../state/sun/sun";
import type { Time } from "../../state/time";

export class Text {

    private _mesh!: THREE.Mesh<TextGeometry, THREE.ShaderMaterial>;

    private readonly _text: string;
    private readonly _fontUrl: string;
    private readonly _textGeometryParams: Partial<Omit<TextGeometryParameters, 'font'>>;
    private readonly _textMaterialParams: Partial<THREE.MeshBasicMaterial>;
    private _rotation: THREE.Vector3;
    private _position: THREE.Vector3;
    private readonly _terrains: TerrainsState;

    private readonly _scene: THREE.Scene;

    private readonly _camera: CameraState;
    private readonly _sun: SunState;
    private readonly _time: Time;

    constructor(options: Partial<TextOptions> = {}) {
        const { text, fontUrl, textGeometryParams, textMaterialParams, initPosition, initRotation } = DEFAULT_TEXT_CONFIGS;

        const view = View.getInstance();
        const state = State.getInstance();

        this._scene = view.scene;

        this._camera = state.camera;
        this._sun = state.sun;
        this._time = state.time;


        this._text = options.text ?? text;
        this._terrains = state.Terrains;
        this._fontUrl = options.fontUrl ?? fontUrl;
        this._textGeometryParams = {
            ...textGeometryParams,
            ...options.textGeometryParams,
        };

        this._textMaterialParams = {
            ...textMaterialParams,
            ...options.textMaterialParams
        }
        this._position = options.initPosition ?? initPosition;
        this._rotation = options.initRotation ?? initRotation;


        this.init();

    }

    public async load(): Promise<Font> {

        const loader = new FontLoader();
        return loader.loadAsync(this._fontUrl);

    }
    public async init() {

        const font: Font = await this.load();
        const geometry = new TextGeometry(this._text, {
            font,
            ...this._textGeometryParams,
        });

        geometry.computeBoundingBox();
        geometry.center();

        //const material = new THREE.MeshBasicMaterial(this._textMaterialParams);
        const material = createNeonMaterial();

        const size = (this._textGeometryParams?.size ?? 0) / 2;
        const text = new THREE.Mesh(geometry, material);
        text.rotateX(this._rotation.x);
        text.rotateZ(this._rotation.z);
        text.rotateY(this._rotation.y);

        const x = this._position.x;
        const z = this._position.z;

        const position = vec2.fromValues(x, z);
        const placeOnTerrain = (state: TerrainState) => {
            if (!state.contains(position)) return;

            const height = state.getHeight(position);

            if (height === undefined) return;

            text.position.set(
                this._position.x,
                height + size,
                this._position.z
            );
            this._scene.add(text);
            this._mesh = text;
        };

        this._terrains.events.on('create', (state: TerrainState) => {
            if (state.contains(position)) {
                state.events.on('ready', () => {
                    placeOnTerrain(state);
                });
            }
        });



    }

    public update() {

        if (!this._mesh) return;

        this._mesh.material.uniforms.uTime.value = this._time.elapsedTime;
        this._mesh.material.uniforms.uLightDirection.value = this._sun.direction;
        this._mesh.material.uniforms.uViewPosition.value = this._camera.position;
        console.log(this._camera.position);
    }

}