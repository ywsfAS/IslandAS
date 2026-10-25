import * as THREE from 'three';
import { vec2 } from 'gl-matrix';
import type { PathState } from '../../state/path/path';
import type { Sun } from '../sun/sun';
import { State } from '../../state/state';
import { View } from '../view';
import type { PathOptions } from './types';
import { DEFAULT_PATH_CONFIG } from './default';
import { createPathMaterial } from '../materials/pathMaterial';

export class Path {

    private _samples: number;
    private _widthSegments: number;
    private _uvScale: number;
    private _yOffset: number;
    private _edgeSoftness: number;
    private _color: string;
    private _edgeColor: string;

    private _curve!: THREE.CatmullRomCurve3;
    private _geometry!: THREE.BufferGeometry;
    private _material!: THREE.ShaderMaterial;
    private _mesh!: THREE.Mesh;

    private _builtVersion = -1;

    private readonly _state: PathState;
    private readonly _scene: THREE.Scene;

    constructor(options: Partial<PathOptions> = {}) {
        const d = DEFAULT_PATH_CONFIG;

        const state = State.getInstance();
        const view = View.getInstance();

        this._state = state.path;
        this._scene = view.scene;

        this._samples = options.samples ?? d.samples;
        this._widthSegments = options.widthSegments ?? d.widthSegments;
        this._uvScale = options.uvScale ?? d.uvScale;
        this._yOffset = options.yOffset ?? d.yOffset;
        this._edgeSoftness = options.edgeSoftness ?? d.edgeSoftness;
        this._color = options.color ?? d.color;
        this._edgeColor = options.edgeColor ?? d.edgeColor;

        this.setMaterial();
        this.setGeometry();
        this.setMesh();
    }

    get mesh() { return this._mesh; }
    get curve() { return this._curve; }

    public setMaterial() {
        this._material = createPathMaterial();
        const u = this._material.uniforms;
        u.uEdgeSoftness.value = this._edgeSoftness;
        u.uColor.value.set(this._color);
        u.uEdgeColor.value.set(this._edgeColor);
    }

    public setGeometry() {
        const points = this._state.points.map((p) => new THREE.Vector3(p[0], 0, p[2]));
        this._curve = new THREE.CatmullRomCurve3(
            points,
            this._state.closed,
            this._state.curveType,
            this._state.tension
        );

        const terrains = State.getInstance().Terrains;
        const sample = vec2.create();
        let lastHeight = 0;      


        const rows = this._samples + 1;
        const cols = this._widthSegments + 1;
        const width = this._state.width;
        const length = this._curve.getLength();

        const positions = new Float32Array(rows * cols * 3);
        const uvs = new Float32Array(rows * cols * 2);
        const indices: number[] = [];

        const center = new THREE.Vector3();
        const tangent = new THREE.Vector3();

        for (let i = 0; i < rows; i++) {
            const u = i / this._samples;
            this._curve.getPointAt(u, center);       
            this._curve.getTangentAt(u, tangent);

            tangent.y = 0;
            tangent.normalize();
            const sideX = -tangent.z;
            const sideZ = tangent.x;

            for (let j = 0; j < cols; j++) {
                const across = j / this._widthSegments;      
                const offset = (across - 0.5) * width;
                const v = i * cols + j;

                const x = center.x + sideX * offset;
                const z = center.z + sideZ * offset;

                const h = terrains.getHeightAt(vec2.set(sample, x, z));
                if (h !== undefined) lastHeight = h;

                positions[v * 3] = x;
                positions[v * 3 + 1] = lastHeight + this._yOffset;
                positions[v * 3 + 2] = z;

                uvs[v * 2] = across;
                uvs[v * 2 + 1] = (u * length) / this._uvScale;
            }
        }

        for (let i = 0; i < this._samples; i++) {
            for (let j = 0; j < this._widthSegments; j++) {
                const a = i * cols + j;
                const b = a + 1;
                const c = a + cols;
                const d = c + 1;
                indices.push(a, b, c, b, d, c);     
            }
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
        geometry.setIndex(indices);
        geometry.computeVertexNormals();
        geometry.computeBoundingSphere();

        this._geometry?.dispose();
        this._geometry = geometry;
        this._builtVersion = this._state.version;

        if (this._mesh) this._mesh.geometry = this._geometry;
    }

    public setMesh() {
        this._mesh = new THREE.Mesh(this._geometry, this._material);
        this._mesh.renderOrder = 1;
        this._scene.add(this._mesh);
    }

    public update(sun?: Sun) {
        if (this._builtVersion !== this._state.version) this.setGeometry();

        if (sun) {
            this._material.uniforms.uSunDirection.value.copy(sun.lightDirection);
            this._material.uniforms.uSunColor.value.copy(sun.color);
        }
    }

    public dispose() {
        this._scene.remove(this._mesh);
        this._geometry.dispose();
        this._material.dispose();
    }
}