import * as THREE from "three";
import { Model } from "../../model";
import { DEFAULT_TOOL_AXE_MATERIAL, DEFAULT_TOOL_AXE_OPTIONS } from "./default";
import type { ToolAxeOptions } from "./types";

export class ToolAxe extends Model {
    constructor(options: ToolAxeOptions = {}) {
        super(DEFAULT_TOOL_AXE_OPTIONS, options);
    }

    protected override setMeshMaterial(mesh: THREE.Mesh): void {
        mesh.material = new THREE.MeshStandardMaterial(DEFAULT_TOOL_AXE_MATERIAL);
    }
}
