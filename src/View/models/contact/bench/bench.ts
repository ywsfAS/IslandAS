import * as THREE from "three";
import { Model } from "../../model";
import { DEFAULT_BENCH_OPTIONS } from "./default";
import type { BenchOptions } from "./types";
import { holidayTexture } from "../holidayTexture";

export class Bench extends Model {
    constructor(options: BenchOptions = {}) {
        super(DEFAULT_BENCH_OPTIONS, options);
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
