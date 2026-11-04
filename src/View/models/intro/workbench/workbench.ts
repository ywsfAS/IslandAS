import * as THREE from "three";
import { Model } from "../../model";
import { DEFAULT_WORKBENCH_OPTIONS } from "./default";
import type { WorkbenchOptions } from "./types";

export class Workbench extends Model {
    constructor(options: WorkbenchOptions = {}) {
        super(DEFAULT_WORKBENCH_OPTIONS, options);
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
