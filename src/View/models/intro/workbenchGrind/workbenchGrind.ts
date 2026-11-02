import * as THREE from "three";
import { Model } from "../../model";
import { DEFAULT_WORKBENCH_GRIND_MATERIAL, DEFAULT_WORKBENCH_GRIND_OPTIONS } from "./default";
import type { WorkbenchGrindOptions } from "./types";

export class WorkbenchGrind extends Model {
    constructor(options: WorkbenchGrindOptions = {}) {
        super(DEFAULT_WORKBENCH_GRIND_OPTIONS, options);
    }

    protected override setMeshMaterial(mesh: THREE.Mesh): void {
        mesh.material = new THREE.MeshStandardMaterial(DEFAULT_WORKBENCH_GRIND_MATERIAL);
    }
}
