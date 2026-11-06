import * as THREE from "three";
import { Model } from "../../model";
import { DEFAULT_WREATH_OPTIONS } from "./default";
import type { WreathOptions } from "./types";
import { holidayTexture } from "../holidayTexture";

export class Wreath extends Model {
    constructor(options: WreathOptions = {}) {
        super(DEFAULT_WREATH_OPTIONS, options);
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
