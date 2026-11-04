import * as THREE from "three";
import { Model } from "../../model";
import { DEFAULT_TOOL_PICKAXE_OPTIONS } from "./default";
import type { ToolPickaxeOptions } from "./types";

export class ToolPickaxe extends Model {
    constructor(options: ToolPickaxeOptions = {}) {
        super(DEFAULT_TOOL_PICKAXE_OPTIONS, options);
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
