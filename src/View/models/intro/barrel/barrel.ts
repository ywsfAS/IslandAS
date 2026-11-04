import * as THREE from "three";
import { Model } from "../../model";
import { DEFAULT_BARREL_OPTIONS } from "./default";
import type { BarrelOptions } from "./types";

export class Barrel extends Model {
    constructor(options: BarrelOptions = {}) {
        super(DEFAULT_BARREL_OPTIONS, options);
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
