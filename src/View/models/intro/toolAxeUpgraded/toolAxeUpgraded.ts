import * as THREE from "three";
import { Model } from "../../model";
import { DEFAULT_TOOL_AXE_UPGRADED_OPTIONS } from "./default";
import type { ToolAxeUpgradedOptions } from "./types";

export class ToolAxeUpgraded extends Model {
    constructor(options: ToolAxeUpgradedOptions = {}) {
        super(DEFAULT_TOOL_AXE_UPGRADED_OPTIONS, options);
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
