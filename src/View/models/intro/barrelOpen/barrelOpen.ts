import * as THREE from "three";
import { Model } from "../../model";
import { DEFAULT_BARREL_OPEN_OPTIONS } from "./default";
import type { BarrelOpenOptions } from "./types";

export class BarrelOpen extends Model {
    constructor(options: BarrelOpenOptions = {}) {
        super(DEFAULT_BARREL_OPEN_OPTIONS, options);
    }

    protected setMeshMaterial(mesh: THREE.Mesh) {
        mesh.material = new THREE.MeshStandardMaterial({
            map: this._introTexture,
            roughness: 0.0,
            metalness: 0,
            flatShading: true,

            toneMapped: false,
            fog: false,

            side: THREE.DoubleSide,
            shadowSide: THREE.FrontSide,
        })
    }
}
