import * as THREE from "three";
import { Model } from "../../model";
import { DEFAULT_TENT_CANVAS_MATERIAL, DEFAULT_TENT_CANVAS_OPTIONS } from "./default";
import type { TentCanvasOptions } from "./types";

export class TentCanvas extends Model {
    constructor(options: TentCanvasOptions = {}) {
        super(DEFAULT_TENT_CANVAS_OPTIONS, options);
    }

    protected override setMeshMaterial(mesh: THREE.Mesh): void {
        mesh.material = new THREE.MeshStandardMaterial(DEFAULT_TENT_CANVAS_MATERIAL);
    }
}
