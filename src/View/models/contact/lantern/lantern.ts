import * as THREE from "three";
import { Model } from "../../model";
import { DEFAULT_LANTERN_OPTIONS } from "./default";
import type { LanternOptions } from "./types";
import { holidayTexture } from "../holidayTexture";

export class Lantern extends Model {
    constructor(options: LanternOptions = {}) {
        super(DEFAULT_LANTERN_OPTIONS, options);
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
