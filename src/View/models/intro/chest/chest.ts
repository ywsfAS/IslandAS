import { Model } from "../../model";
import { DEFAULT_CHEST_OPTIONS } from "./default";
import type { ChestOptions } from "./types";
import * as THREE from 'three';

export class Chest extends Model {
    constructor(options: ChestOptions = {}) {
        super(DEFAULT_CHEST_OPTIONS, options);
    }
    protected setMeshMaterial(mesh: THREE.Mesh) {
        mesh.material = new THREE.MeshStandardMaterial({
            map: this._introTexture,
            roughness: 0.8,
            metalness: 0,
            flatShading: true,

            toneMapped: false,
            fog: false,

            side: THREE.DoubleSide,
            shadowSide: THREE.FrontSide,
        })
    }
}
