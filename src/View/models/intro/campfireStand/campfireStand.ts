import * as THREE from "three";
import { Model } from "../../model";
import { DEFAULT_CAMPFIRE_STAND_MATERIAL, DEFAULT_CAMPFIRE_STAND_OPTIONS } from "./default";
import type { CampfireStandOptions } from "./types";

export class CampfireStand extends Model {
    constructor(options: CampfireStandOptions = {}) {
        super(DEFAULT_CAMPFIRE_STAND_OPTIONS, options);
    }

    protected override setMeshMaterial(mesh: THREE.Mesh): void {
        mesh.material = new THREE.MeshStandardMaterial(DEFAULT_CAMPFIRE_STAND_MATERIAL);
    }
}
