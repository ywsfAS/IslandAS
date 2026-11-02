import * as THREE from "three";
import { Model } from "../../model";
import { DEFAULT_FLOOR_MATERIAL, DEFAULT_FLOOR_OPTIONS } from "./default";
import type { FloorOptions } from "./types";

export class Floor extends Model {
    constructor(options: FloorOptions = {}) {
        super(DEFAULT_FLOOR_OPTIONS, options);
    }

    protected override setMeshMaterial(mesh: THREE.Mesh): void {
        mesh.material = new THREE.MeshStandardMaterial(DEFAULT_FLOOR_MATERIAL);
    }
}
