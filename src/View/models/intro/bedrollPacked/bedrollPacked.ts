import * as THREE from "three";
import { Model } from "../../model";
import { DEFAULT_BEDROLL_PACKED_MATERIAL, DEFAULT_BEDROLL_PACKED_OPTIONS } from "./default";
import type { BedrollPackedOptions } from "./types";

export class BedrollPacked extends Model {
    constructor(options: BedrollPackedOptions = {}) {
        super(DEFAULT_BEDROLL_PACKED_OPTIONS, options);
    }

    protected override setMeshMaterial(mesh: THREE.Mesh): void {
        mesh.material = new THREE.MeshStandardMaterial(DEFAULT_BEDROLL_PACKED_MATERIAL);
    }
}
