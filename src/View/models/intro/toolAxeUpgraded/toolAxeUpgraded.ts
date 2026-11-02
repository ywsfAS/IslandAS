import * as THREE from "three";
import { Model } from "../../model";
import { DEFAULT_TOOL_AXE_UPGRADED_MATERIAL, DEFAULT_TOOL_AXE_UPGRADED_OPTIONS } from "./default";
import type { ToolAxeUpgradedOptions } from "./types";

export class ToolAxeUpgraded extends Model {
    constructor(options: ToolAxeUpgradedOptions = {}) {
        super(DEFAULT_TOOL_AXE_UPGRADED_OPTIONS, options);
    }

    protected override setMeshMaterial(mesh: THREE.Mesh): void {
        mesh.material = new THREE.MeshStandardMaterial(DEFAULT_TOOL_AXE_UPGRADED_MATERIAL);
    }
}
