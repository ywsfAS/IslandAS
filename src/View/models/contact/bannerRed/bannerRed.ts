import * as THREE from "three";
import { Model } from "../../model";
import { DEFAULT_BANNER_RED_OPTIONS } from "./default";
import type { BannerRedOptions } from "./types";
import { townTexture } from "../townTexture";

export class BannerRed extends Model {
    constructor(options: BannerRedOptions = {}) {
        super(DEFAULT_BANNER_RED_OPTIONS, options);
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
