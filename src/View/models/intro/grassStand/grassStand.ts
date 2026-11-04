import { Model } from "../../model";
import { DEFAULT_GRASS_STAND_OPTIONS } from "./default";
import type { grassStandOption } from "./types";
import * as THREE from 'three';

export class GrassStand extends Model {

    constructor(options: grassStandOption) {
        super(DEFAULT_GRASS_STAND_OPTIONS, options);
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