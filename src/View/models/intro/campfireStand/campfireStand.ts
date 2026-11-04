import * as THREE from "three";
import { Model } from "../../model";
import { DEFAULT_CAMPFIRE_STAND_OPTIONS } from "./default";
import type { CampfireStandOptions } from "./types";

export class CampfireStand extends Model {
    constructor(options: CampfireStandOptions = {}) {
        super(DEFAULT_CAMPFIRE_STAND_OPTIONS, options);
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
