import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import type { TreesState } from '../../state/trees/trees';
import { State } from '../../state/state';
import { View } from '../view';
import type { TreesOptions } from './types';
import { DEFAULT_TREES_CONFIG } from './default';
import { createTreeMaterial } from '../materials/treeMaterial';


export class Trees {

    private _trunkColor: THREE.Color;
    private _leafColor: THREE.Color;
    private _castShadow: boolean;

    private _geometry!: THREE.BufferGeometry;
    private _material!: THREE.ShaderMaterial;
    private _mesh!: THREE.InstancedMesh;

    private _applied = 0;
    private readonly _dummy = new THREE.Object3D();

    private readonly _state: TreesState;
    private readonly _scene: THREE.Scene;
    private readonly _onReady = () => this.onData();

    constructor(options: Partial<TreesOptions> = {}) {
        const d = DEFAULT_TREES_CONFIG;

        const state = State.getInstance();
        const view = View.getInstance();

        this._state = state.trees;
        this._scene = view.scene;

        this._trunkColor = new THREE.Color(options.trunkColor ?? d.trunkColor);
        this._leafColor = new THREE.Color(options.leafColor ?? d.leafColor);
        this._castShadow = options.castShadow ?? d.castShadow;

        this.setGeometry();
        this.setMaterial();
        this.setMesh();

        this._state.events.on('ready', this._onReady);
        if (this._state.isReady) this.onData();
    }

    get mesh() { return this._mesh; }

    public setGeometry() {
        const trunk = new THREE.CylinderGeometry(0.12, 0.2, 1, 6).translate(0, 0.5, 0);
        const low = new THREE.ConeGeometry(1.0, 1.7, 7).translate(0, 1.7, 0);
        const high = new THREE.ConeGeometry(0.7, 1.4, 7).translate(0, 2.5, 0);

        const merged = mergeGeometries([trunk, low, high], false);
        trunk.dispose();
        low.dispose();
        high.dispose();

        if (!merged) throw new Error('Trees: could not merge the tree geometry');
        this._geometry = merged;
    }

    public setMaterial() {
        this._material = createTreeMaterial();
    }

    public setMesh() {
        this._mesh = new THREE.InstancedMesh(this._geometry, this._material, this._state.maxCount);
        this._mesh.count = 0;
        this._mesh.frustumCulled = false;
        this._mesh.castShadow = this._castShadow;
        this._mesh.receiveShadow = true;
        this._scene.add(this._mesh);
    }

    private onData() {
        const p = this._state.positions;
        const count = this._state.count;

        for (let i = this._applied; i < count; i++) {
            this._dummy.position.set(p[i * 3], p[i * 3 + 1], p[i * 3 + 2]);
            this._dummy.rotation.y = Math.random() * Math.PI * 2;
            this._dummy.scale.setScalar(5.8 + Math.random() * 0.6);
            this._dummy.updateMatrix();
            this._mesh.setMatrixAt(i, this._dummy.matrix);
        }

        this._applied = count;
        this._mesh.count = count;
        this._mesh.instanceMatrix.needsUpdate = true;
    }

    public dispose() {
        this._state.events.off('ready', this._onReady);
        this._scene.remove(this._mesh);
        this._mesh.dispose();
        this._geometry.dispose();
        this._material.dispose();
    }
}