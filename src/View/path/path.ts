import * as THREE from 'three';
import type { PathState } from '../../state/path/path';
import type { SunState } from '../../state/sun/sun';
import { State } from '../../state/state';
import { View } from '../view';
import type { PathOptions } from './types';
import { DEFAULT_PATH_CONFIG } from './default';
import { createPathMaterial } from '../materials/pathMaterial';

export class Path {

    private _edgeSoftness: number;
    private _color: string;
    private _edgeColor: string;

    private _geometry: THREE.BufferGeometry | null = null;
    private _material!: THREE.ShaderMaterial;
    private _mesh: THREE.Mesh | null = null;

    private readonly _state: PathState;
    private readonly _sun: SunState;
    private readonly _scene: THREE.Scene;

    constructor(options: Partial<PathOptions> = {}) {
        const d = DEFAULT_PATH_CONFIG;

        const state = State.getInstance();
        const view = View.getInstance();

        this._state = state.path;
        this._sun = state.sun;
        this._scene = view.scene;

        this._edgeSoftness = options.edgeSoftness ?? d.edgeSoftness;
        this._color = options.color ?? d.color;
        this._edgeColor = options.edgeColor ?? d.edgeColor;

        this.setMaterial();
        this._state.events.on('ready', () => this.createGeometry());
    }

    get mesh() { return this._mesh; }

    public setMaterial() {
        this._material = createPathMaterial();
        const u = this._material.uniforms;
        u.uEdgeSoftness.value = this._edgeSoftness;
        u.uColor.value.set(this._color);
        u.uEdgeColor.value.set(this._edgeColor);
    }

    private createGeometry() {
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(this._state.positions, 3));
        geometry.setAttribute('uv', new THREE.BufferAttribute(this._state.uv, 2));
        geometry.setIndex(new THREE.BufferAttribute(this._state.indices, 1));
        geometry.computeVertexNormals();
        geometry.computeBoundingSphere();
        this._geometry = geometry;

        this._mesh = new THREE.Mesh(geometry, this._material);
        this._mesh.renderOrder = 1;
        this._scene.add(this._mesh);
    }

    public update() {
        const p = this._sun.position;
        const c = this._sun.center;
        const col = this._sun.color;
        const u = this._material.uniforms;

        u.uSunDirection.value.set(p[0] - c[0], p[1] - c[1], p[2] - c[2]).normalize();
        u.uSunColor.value.setRGB(col[0], col[1], col[2]);
    }

    public dispose() {
        if (this._mesh) this._scene.remove(this._mesh);
        this._geometry?.dispose();
        this._material.dispose();
    }
}