import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import type { TreesState } from '../../state/trees/trees';
import { State } from '../../state/state';
import { View } from '../view';
import type { TreeGeometryOptions, TreesOptions } from './types';
import { DEFAULT_TREES_CONFIG } from './default';
import { createTreeMaterial } from '../materials/treeMaterial';
import type { Sun } from '../sun/sun';



export class Trees {

    private _trunkColor: THREE.Color;
    private _leafColor: THREE.Color;
    private _castShadow: boolean;
    private _geometryOptions: TreeGeometryOptions;

    private _geometry!: THREE.BufferGeometry;
    private _material!: THREE.ShaderMaterial;
    private _mesh!: THREE.InstancedMesh;

    private _applied = 0;
    private readonly _dummy = new THREE.Object3D();

    private readonly _state: TreesState;
    private readonly _scene: THREE.Scene;
    private readonly _sun: Sun;
    private readonly _onReady = () => this.onData();

    constructor(options: Partial<TreesOptions> = {}) {
        const d = DEFAULT_TREES_CONFIG;

        const state = State.getInstance();
        const view = View.getInstance();

        this._state = state.trees;
        this._scene = view.scene;
        this._sun = view.sun;

        this._trunkColor = new THREE.Color(options.trunkColor ?? d.trunkColor);
        this._leafColor = new THREE.Color(options.leafColor ?? d.leafColor);
        this._castShadow = options.castShadow ?? d.castShadow;
        this._geometryOptions = { ...options.geometryOptions, ...d.geometryOptions };

        this.setGeometry();
        this.setMaterial();
        this.setMesh();

        this._state.events.on('ready', this._onReady);
        if (this._state.isReady) this.onData();
    }

    get mesh() { return this._mesh; }
    private setSectionId(
        geometry: THREE.BufferGeometry,
        id: number
    ) {
        const count = geometry.getAttribute('position').count;

        const ids = new Float32Array(count).fill(id);

        geometry.setAttribute(
            'aSection',
            new THREE.BufferAttribute(ids, 1)
        );
    }
    public setGeometry() {
        const { cylindre, lowCone, topCone } = this._geometryOptions;

        const { radiusBottom, radiusTop, height, translation: cylindreTranslation } = cylindre;
        const { radius: lowRadius, height: lowHeight, radialSegments: lowRadialSegments, translation: lowTranslation } = lowCone;
        const { radius: topRadius, height: topHeight, radialSegments: topRadialSegments, translation: topTranslation } = topCone;

        const trunk = new THREE.CylinderGeometry(radiusTop, radiusBottom, height).
            translate(cylindreTranslation[0], cylindreTranslation[1], cylindreTranslation[2]);


        const low = new THREE.ConeGeometry(lowRadius, lowHeight, lowRadialSegments).
            translate(lowTranslation[0], lowTranslation[1], lowTranslation[2]);


        const high = new THREE.ConeGeometry(topRadius, topHeight, topRadialSegments).
            translate(topTranslation[0], topTranslation[1], topTranslation[2]);

        this.setSectionId(trunk, 0);
        this.setSectionId(low, 1);
        this.setSectionId(high, 2);

        const merged = mergeGeometries([trunk, low, high], false);
        trunk.dispose();
        low.dispose();
        high.dispose();

        if (!merged) throw new Error('Trees: could not merge the tree geometry');
        this._geometry = merged;
    }

    public setMaterial() {
        this._material = createTreeMaterial();

        this._material.uniforms.uCylindreColor.value = this._trunkColor;
        this._material.uniforms.uLowConeColor.value = this._leafColor;
        this._material.uniforms.uTopConeColor.value = this._leafColor;

        this._material.uniforms.uLightDirection.value = this._sun.lightDirection;
        this._material.uniforms.uSunColor.value = this._sun.color;
        this._material.uniforms.uSunIntensity.value = this._sun.intensity;

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
    public update(): void {
        this._material.uniforms.uLightDirection.value = this._sun.lightDirection;
        this._material.uniforms.uSunColor.value = this._sun.color;
        this._material.uniforms.uSunIntensity.value = this._sun.intensity;



    }

    public dispose() {
        this._state.events.off('ready', this._onReady);
        this._scene.remove(this._mesh);
        this._mesh.dispose();
        this._geometry.dispose();
        this._material.dispose();
    }
}