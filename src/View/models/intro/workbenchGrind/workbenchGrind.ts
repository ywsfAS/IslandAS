import * as THREE from "three";
import { Model } from "../../model";
import { DEFAULT_WORKBENCH_GRIND_OPTIONS } from "./default";
import type { WorkbenchGrindOptions } from "./types";

export class WorkbenchGrind extends Model {
    constructor(options: WorkbenchGrindOptions = {}) {
        super(DEFAULT_WORKBENCH_GRIND_OPTIONS, options);
    }

    protected setMeshMaterial(mesh: THREE.Mesh) {
        mesh.material = new THREE.MeshStandardMaterial({
            map: this._introTexture,
            roughness: 0.8,
            metalness: 0,
            flatShading: true,

            toneMapped: false,
            fog: false,

            side: THREE.DoubleSide,
            shadowSide: THREE.FrontSide,
        })
    }
}
