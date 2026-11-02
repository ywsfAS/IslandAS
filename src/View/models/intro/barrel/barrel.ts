import * as THREE from "three";
import { Model } from "../../model";
import { DEFAULT_BARREL_MATERIAL, DEFAULT_BARREL_OPTIONS } from "./default";
import type { BarrelOptions } from "./types";

export class Barrel extends Model {
    constructor(options: BarrelOptions = {}) {
        super(DEFAULT_BARREL_OPTIONS, options);
    }

    protected override setMeshMaterial(mesh: THREE.Mesh): void {
        mesh.material = new THREE.MeshStandardMaterial(DEFAULT_BARREL_MATERIAL);
    }
}
