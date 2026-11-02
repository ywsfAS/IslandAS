import * as THREE from "three";
import { Model } from "../../model";
import { DEFAULT_TOOL_PICKAXE_UPGRADED_MATERIAL, DEFAULT_TOOL_PICKAXE_UPGRADED_OPTIONS } from "./default";
import type { ToolPickaxeUpgradedOptions } from "./types";

export class ToolPickaxeUpgraded extends Model {
    constructor(options: ToolPickaxeUpgradedOptions = {}) {
        super(DEFAULT_TOOL_PICKAXE_UPGRADED_OPTIONS, options);
    }

    protected override setMeshMaterial(mesh: THREE.Mesh): void {
        mesh.material = new THREE.MeshStandardMaterial(DEFAULT_TOOL_PICKAXE_UPGRADED_MATERIAL);
    }
}
