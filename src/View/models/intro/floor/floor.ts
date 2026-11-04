import * as THREE from "three";
import { Model } from "../../model";
import { DEFAULT_FLOOR_OPTIONS } from "./default";
import type { FloorOptions } from "./types";

export class Floor extends Model {
    constructor(options: FloorOptions = {}) {
        super(DEFAULT_FLOOR_OPTIONS, options);
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
