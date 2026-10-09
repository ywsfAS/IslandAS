import * as THREE from 'three';
import { View } from '../view';

export class World {

    private _mesh!: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>
    private readonly _scene: THREE.Scene;

    constructor() {

        const view = View.getInstance();
        this._scene = view.scene;

        this.getMesh();
    }
    public getMesh(): void {

        const worldGeometry = new THREE.PlaneGeometry(100, 100);
        const worldMaterial = new THREE.MeshBasicMaterial({
            color: "#0077b6",
            side: THREE.DoubleSide
        })

        this._mesh = new THREE.Mesh(worldGeometry, worldMaterial);

        this._mesh.position.set(0, 0, 0);
        this._mesh.rotateX(-Math.PI / 2);
        this._scene.add(this._mesh);
    }

    public update() {
    }








}