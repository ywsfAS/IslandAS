import * as THREE from "three";
import { Model } from "../../model";
import { DEFAULT_PRESENT_CUBE_OPTIONS } from "./default";
import type { PresentCubeOptions } from "./types";
import { holidayTexture } from "../holidayTexture";

export class PresentCube extends Model {
    constructor(options: PresentCubeOptions = {}) {
        super(DEFAULT_PRESENT_CUBE_OPTIONS, options);
    }

    protected setMeshMaterial(mesh: THREE.Mesh): void {
        mesh.material = new THREE.MeshStandardMaterial({
            map: holidayTexture,
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
