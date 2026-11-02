import * as THREE from "three";
import { Model } from "../../model";
import { DEFAULT_TOOL_PICKAXE_MATERIAL, DEFAULT_TOOL_PICKAXE_OPTIONS } from "./default";
import type { ToolPickaxeOptions } from "./types";

export class ToolPickaxe extends Model {
    constructor(options: ToolPickaxeOptions = {}) {
        super(DEFAULT_TOOL_PICKAXE_OPTIONS, options);
    }

    protected override setMeshMaterial(mesh: THREE.Mesh): void {
        mesh.material = new THREE.MeshStandardMaterial(DEFAULT_TOOL_PICKAXE_MATERIAL);
    }
}
