import { Model } from "../../model";
import type { BoxOptions, BoxSize, BoxStatus } from "./types";
import { BOX_OPTIONS } from './default';
import * as THREE from 'three';

export class Box extends Model {

    constructor(options: BoxOptions, size: BoxSize = "normal", status: BoxStatus = "closed") {

        const configModel = BOX_OPTIONS[size][status];

        super(configModel, options);

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