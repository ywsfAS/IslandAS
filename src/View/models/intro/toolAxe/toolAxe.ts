import * as THREE from "three";
import { Model } from "../../model";
import { DEFAULT_TOOL_AXE_OPTIONS } from "./default";
import type { ToolAxeOptions } from "./types";

export class ToolAxe extends Model {
    constructor(options: ToolAxeOptions = {}) {
        super(DEFAULT_TOOL_AXE_OPTIONS, options);
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
