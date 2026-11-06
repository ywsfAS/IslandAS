import * as THREE from "three";
import { Model } from "../../model";
import { DEFAULT_PRESENT_RECTANGLE_OPTIONS } from "./default";
import type { PresentRectangleOptions } from "./types";
import { holidayTexture } from "../holidayTexture";

export class PresentRectangle extends Model {
    constructor(options: PresentRectangleOptions = {}) {
        super(DEFAULT_PRESENT_RECTANGLE_OPTIONS, options);
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
