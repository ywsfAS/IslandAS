import * as THREE from "three";
import { Model } from "../../model";
import { DEFAULT_WORKBENCH_MATERIAL, DEFAULT_WORKBENCH_OPTIONS } from "./default";
import type { WorkbenchOptions } from "./types";

export class Workbench extends Model {
    constructor(options: WorkbenchOptions = {}) {
        super(DEFAULT_WORKBENCH_OPTIONS, options);
    }

    protected override setMeshMaterial(mesh: THREE.Mesh): void {
        mesh.material = new THREE.MeshStandardMaterial(DEFAULT_WORKBENCH_MATERIAL);
    }
}
