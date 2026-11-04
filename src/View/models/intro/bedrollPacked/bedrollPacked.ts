import * as THREE from "three";
import { Model } from "../../model";
import { DEFAULT_BEDROLL_PACKED_OPTIONS } from "./default";
import type { BedrollPackedOptions } from "./types";

export class BedrollPacked extends Model {
    constructor(options: BedrollPackedOptions = {}) {
        super(DEFAULT_BEDROLL_PACKED_OPTIONS, options);
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
