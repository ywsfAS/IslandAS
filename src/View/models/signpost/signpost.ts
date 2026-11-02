import * as THREE from "three";
import { Model } from "../model";
import { DEFAULT_SIGNPOST_MATERIAL, DEFAULT_SIGNPOST_OPTIONS } from "./default";
import type { SignpostOptions } from "./types";

export class Signpost extends Model {
    constructor(options: SignpostOptions = {}) {
        super(DEFAULT_SIGNPOST_OPTIONS, options);
    }

    protected override setMeshMaterial(mesh: THREE.Mesh): void {
        mesh.material = new THREE.MeshStandardMaterial(DEFAULT_SIGNPOST_MATERIAL);
    }
}
