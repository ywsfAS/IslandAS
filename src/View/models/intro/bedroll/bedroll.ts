import * as THREE from "three";
import { Model } from "../../model";
import { DEFAULT_BEDROLL_MATERIAL, DEFAULT_BEDROLL_OPTIONS } from "./default";
import type { BedrollOptions } from "./types";

export class Bedroll extends Model {
    constructor(options: BedrollOptions = {}) {
        super(DEFAULT_BEDROLL_OPTIONS, options);
    }

    protected override setMeshMaterial(mesh: THREE.Mesh): void {
        mesh.material = new THREE.MeshStandardMaterial(DEFAULT_BEDROLL_MATERIAL);
    }
}
