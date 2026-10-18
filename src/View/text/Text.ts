import { Font, FontLoader, TextGeometry, type TextGeometryParameters } from "three/examples/jsm/Addons.js";
import { View } from "../view";
import { DEFAULT_TEXT_CONFIGS } from './default';
import type { TextOptions } from './types';
import * as THREE from 'three';

export class Text {

    private _mesh!: THREE.Mesh<TextGeometry, THREE.MeshBasicMaterial>;

    private readonly _text: string;
    private readonly _fontUrl: string;
    private readonly _textGeometryParams: Partial<Omit<TextGeometryParameters, 'font'>>;
    private readonly _textMaterialParams: Partial<THREE.MeshBasicMaterial>;
    private _rotation: THREE.Vector3;
    private _position: THREE.Vector3;

    private readonly _scene: THREE.Scene;

    constructor(options: Partial<TextOptions> = {}) {
        const { text, fontUrl, textGeometryParams, textMaterialParams, initPosition, initRotation } = DEFAULT_TEXT_CONFIGS;

        const view = View.getInstance();
        this._scene = view.scene;

        this._text = options.text ?? text;
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

        const material = new THREE.MeshBasicMaterial(this._textMaterialParams);

        const size = (this._textGeometryParams?.size ?? 0) / 2;
        const text = new THREE.Mesh(geometry, material);
        text.position.set(0, size, -4);
        text.rotateX(this._rotation.x);
        text.rotateZ(this._rotation.z);
        text.rotateY(this._rotation.y);

        this._scene.add(text);


        this._mesh = text;

    }

}