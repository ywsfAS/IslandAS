import { Model } from "../../model";
import type { ModelOptions } from "../../types";
import { DEFAULT_NORMAL_TREE_LOG_OPTIONS, DEFAULT_SMALL_TREE_LOG_OPTIONS } from "./default";
import * as THREE from 'three';
import type { TreeLogOption, TreeLogSize } from "./types";

export class TreeLog extends Model {
    constructor(options: TreeLogOption, size: TreeLogSize = "normal") {
        const modelConfig: ModelOptions = size === "normal" ? DEFAULT_NORMAL_TREE_LOG_OPTIONS : DEFAULT_SMALL_TREE_LOG_OPTIONS;
        super(modelConfig, options);
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