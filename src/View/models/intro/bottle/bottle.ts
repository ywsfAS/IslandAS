import { Model } from "../../model";
import { BOTTLE_OPTIONS } from "./default";
import type { BottleOptions, BottleSize } from "./types";
import * as THREE from 'three';

export class Bottle extends Model {
    constructor(options: BottleOptions = {}, size: BottleSize = "small") {
        super(BOTTLE_OPTIONS[size], options);
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
