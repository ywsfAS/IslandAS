import * as THREE from "three";
import { Model } from "../../model";
import { DEFAULT_STALL_OPTIONS } from "./default";
import type { StallOptions } from "./types";
import { townTexture } from "../townTexture";

export class Stall extends Model {
    constructor(options: StallOptions = {}) {
        super(DEFAULT_STALL_OPTIONS, options);
    }

    protected setMeshMaterial(mesh: THREE.Mesh): void {
        mesh.material = new THREE.MeshStandardMaterial({
            map: townTexture,
            roughness: 0.8,
            metalness: 0,
            flatShading: true,
            toneMapped: false,
            fog: false,
            side: THREE.DoubleSide,
            shadowSide: THREE.FrontSide,
        });
    }
}
