import * as THREE from 'three';
import { View } from '../view';
export class Player {

    private _mesh!: THREE.Mesh<THREE.CapsuleGeometry, THREE.MeshBasicMaterial>;
    private readonly _group = new THREE.Group();

    constructor() {

        const view = View.getInstance();

        view.scene.add(this._group);

        this.setMesh();
    }

    private setMesh(): void {

        const playerGeometry = new THREE.CapsuleGeometry(1, 1, 8, 10, 10);
        const playerMaterial = new THREE.MeshBasicMaterial({
            color: '#219ebc'
        });

        this._mesh = new THREE.Mesh(playerGeometry, playerMaterial);

        this._group.add(this._mesh);
    }

    public update() {
        this._mesh.position.x += 0;
    }
    public dispose() {
        this._group.remove(this._mesh);
        this._mesh.geometry.dispose();
        this._mesh.material.dispose();
    }

}