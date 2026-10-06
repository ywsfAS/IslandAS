import * as THREE from 'three';
import { View } from '../view';
import { State } from '../../state/state';

// TODO : create player material and shaders with configs
export class Player {

    private _mesh!: THREE.Mesh<THREE.CapsuleGeometry, THREE.MeshBasicMaterial>;
    private readonly _group = new THREE.Group();
    private readonly _player;

    constructor() {

        const view = View.getInstance();
        const state = State.getInstance();
        this._player = state.player;

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
        const pos = this._player.position.cur;
        const rot = this._player.rotation;
        this._mesh.position.set(pos.x, pos.y, pos.z);
        this._mesh.rotation.y = rot;
    }
    public dispose() {
        this._group.remove(this._mesh);
        this._mesh.geometry.dispose();
        this._mesh.material.dispose();
    }

}