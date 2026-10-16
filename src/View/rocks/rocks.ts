import * as THREE from 'three';
import { createRockMaterial } from '../materials/rockMaterial';
import { View } from '../view';
import type { RockOptions } from './types';
import { DEFAULT_ROCKS_CONFIGS } from './default';
import type { Grass } from '../grass/grass';

export class Rocks {

    private readonly _mesh: THREE.InstancedMesh<THREE.DodecahedronGeometry, THREE.ShaderMaterial>;
    private readonly _scene: THREE.Scene;
    private readonly _grass: Grass;

    private _count: number;
    private _detail: number;
    private _radius: number;


    constructor(options: Partial<RockOptions> = {}) {

        const { radius, count, detail } = DEFAULT_ROCKS_CONFIGS;
        const view = View.getInstance();

        this._scene = view.scene;
        this._grass = view.grass;

        this._count = options.count ?? count;
        this._radius = options.radius ?? radius;
        this._detail = options.detail ?? detail;

        this._mesh = this.setMesh();

        this._scene.add(this._mesh);

    }
    public setMesh() {
        const rockGeometry = new THREE.DodecahedronGeometry(this._radius, this._detail);
        const rockMaterial = createRockMaterial();

        const count = this._count;
        const size = this._grass.chunkSize;
        const instancedMesh = new THREE.InstancedMesh(rockGeometry, rockMaterial, count);

        const randomValues = new Float32Array(count);

        for (let i = 0; i < count; i++) {

            randomValues[i] = Math.random() * 2.0;

            const matrix = new THREE.Matrix4();
            matrix.setPosition(
                (0.5 - Math.random()) * size,
                1,
                (0.5 - Math.random()) * size
            );

            instancedMesh.setMatrixAt(i, matrix);

        };
        instancedMesh.instanceMatrix.needsUpdate = true;
        instancedMesh.geometry.setAttribute('aRandom', new THREE.InstancedBufferAttribute(randomValues, 1));

        return instancedMesh;

    }



}