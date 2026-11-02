import * as THREE from "three";
import { Model } from "../../model";
import { DEFAULT_WORKBENCH_ANVIL_MATERIAL, DEFAULT_WORKBENCH_ANVIL_OPTIONS } from "./default";
import type { WorkbenchAnvilOptions } from "./types";

export class WorkbenchAnvil extends Model {
    constructor(options: WorkbenchAnvilOptions = {}) {
        super(DEFAULT_WORKBENCH_ANVIL_OPTIONS, options);
    }

    protected override setMeshMaterial(mesh: THREE.Mesh): void {
        mesh.material = new THREE.MeshStandardMaterial(DEFAULT_WORKBENCH_ANVIL_MATERIAL);
    }
}
