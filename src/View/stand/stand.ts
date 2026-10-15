import * as THREE from 'three';
import { State } from '../../state/state';
import { View } from '../view';
import type { StandOptions } from './types';
import { DEFAULT_STAND_CONFIGS } from './default';
import { vec2 } from 'gl-matrix';
import { CSS3DObject, CSS3DRenderer } from 'three/examples/jsm/Addons.js';
import type { Camera } from '../camera/camera';
import type { Viewport } from '../../state/viewport/viewport';

export interface S {
    width: number;
    height: number;
    space: number;
}
export class Stand {

    private _material!: THREE.MeshBasicMaterial;
    private _geometery!: THREE.BoxGeometry;
    private _mesh!: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>;

    private _scene: THREE.Scene;

    private _width: number;
    private _height: number;
    private _depth: number;

    constructor(options: Partial<StandOptions> = {}) {

        const { width, height, depth } = DEFAULT_STAND_CONFIGS;
        const view = View.getInstance();

        this._scene = view.scene;

        this._width = options.width ?? width;
        this._height = options.height ?? height;
        this._depth = options.depth ?? depth;

    }

    public setGeometry() {
        this._geometery = new THREE.BoxGeometry(this._width, this._height, this._depth);
    }
    public setMaterial() {
        this._material = new THREE.MeshBasicMaterial({
            color: "#ffffff",
        });

    }
    public setMesh() {

        const halfDepth = this._depth / 2;
        this._mesh = new THREE.Mesh(this._geometery, this._material);
        this._mesh.position.set(0, halfDepth, 0);
        this._mesh.rotateX(-Math.PI / 2);

        this._scene.add(this._mesh);
    }
    public getHeightAt(x: number, z: number) {
        if (this._mesh.position.x === x && this._mesh.position.z === z) {
            return this._mesh.position.y;
        }
    }
    public addEntrance(n: number = 5) {
        const initialPosition = vec2.fromValues(0, -50);
        const meshList: THREE.Object3D[] = [];
        let direction = 1;

        const conf: S = {
            width: 5,
            height: 5,
            space: 3
        }

        for (let i = 0; i < n; i++) {

            const mesh = new THREE.Mesh(
                new THREE.BoxGeometry(conf.width, conf.height),
                new THREE.MeshBasicMaterial()

            )
            mesh.position.set(initialPosition[0], .5, initialPosition[1]);
            mesh.rotateX(-Math.PI / 2);
            meshList.push(mesh);

            initialPosition[0] += (-direction) * conf.space;
            initialPosition[1] += conf.height + conf.space;
            direction = -direction;

            this._scene.add(mesh);

        }


    }
    public update() {
    }

}