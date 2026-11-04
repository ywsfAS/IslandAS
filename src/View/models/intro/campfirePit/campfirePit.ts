import * as THREE from "three";
import { Model } from "../../model";
import { DEFAULT_CAMPFIRE_PIT_OPTIONS } from "./default";
import type { CampfirePitOptions } from "./types";

export class CampfirePit extends Model {
    constructor(options: CampfirePitOptions = {}) {
        super(DEFAULT_CAMPFIRE_PIT_OPTIONS, options);
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
