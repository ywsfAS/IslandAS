import * as THREE from "three";
import { Model } from "../../model";
import { DEFAULT_BARREL_OPEN_MATERIAL, DEFAULT_BARREL_OPEN_OPTIONS } from "./default";
import type { BarrelOpenOptions } from "./types";

export class BarrelOpen extends Model {
    constructor(options: BarrelOpenOptions = {}) {
        super(DEFAULT_BARREL_OPEN_OPTIONS, options);
    }

    protected override setMeshMaterial(mesh: THREE.Mesh): void {
        mesh.material = new THREE.MeshStandardMaterial(DEFAULT_BARREL_OPEN_MATERIAL);
    }
}
