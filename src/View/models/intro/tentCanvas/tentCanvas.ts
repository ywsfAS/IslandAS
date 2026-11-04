import * as THREE from "three";
import { Model } from "../../model";
import { DEFAULT_TENT_CANVAS_OPTIONS } from "./default";
import type { TentCanvasOptions } from "./types";

export class TentCanvas extends Model {
    constructor(options: TentCanvasOptions = {}) {
        super(DEFAULT_TENT_CANVAS_OPTIONS, options);
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
