import * as THREE from "three";
import { Model } from "../../model";
import { DEFAULT_WORKBENCH_ANVIL_OPTIONS } from "./default";
import type { WorkbenchAnvilOptions } from "./types";

export class WorkbenchAnvil extends Model {
    constructor(options: WorkbenchAnvilOptions = {}) {
        super(DEFAULT_WORKBENCH_ANVIL_OPTIONS, options);
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
