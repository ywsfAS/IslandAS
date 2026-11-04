import { Model } from "../../model";
import { DEFAULT_PLANKS_OPTIONS } from "./default";
import type { PlanksOptions } from "./types";
import * as THREE from 'three';

export class Planks extends Model {
    constructor(options: PlanksOptions = {}) {
        super(DEFAULT_PLANKS_OPTIONS, options);
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
