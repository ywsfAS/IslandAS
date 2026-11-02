import * as THREE from "three";
import { Model } from "../../model";
import { DEFAULT_CAMPFIRE_PIT_MATERIAL, DEFAULT_CAMPFIRE_PIT_OPTIONS } from "./default";
import type { CampfirePitOptions } from "./types";

export class CampfirePit extends Model {
    constructor(options: CampfirePitOptions = {}) {
        super(DEFAULT_CAMPFIRE_PIT_OPTIONS, options);
    }

    protected override setMeshMaterial(mesh: THREE.Mesh): void {
        mesh.material = new THREE.MeshStandardMaterial(DEFAULT_CAMPFIRE_PIT_MATERIAL);
    }
}
