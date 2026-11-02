import * as THREE from "three";
import { Model } from "../model";
import { DEFAULT_SIGNPOST_SINGLE_MATERIAL, DEFAULT_SIGNPOST_SINGLE_OPTIONS } from "./default";
import type { SignpostSingleOptions } from "./types";

export class SignpostSingle extends Model {
    constructor(options: SignpostSingleOptions = {}) {
        super(DEFAULT_SIGNPOST_SINGLE_OPTIONS, options);
    }

    protected override setMeshMaterial(mesh: THREE.Mesh): void {
        mesh.material = new THREE.MeshStandardMaterial(DEFAULT_SIGNPOST_SINGLE_MATERIAL);
    }
}
