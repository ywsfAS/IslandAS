import * as THREE from "three";
import { Model } from "../../model";
import { DEFAULT_STALL_BENCH_OPTIONS } from "./default";
import type { StallBenchOptions } from "./types";
import { townTexture } from "../townTexture";

export class StallBench extends Model {
    constructor(options: StallBenchOptions = {}) {
        super(DEFAULT_STALL_BENCH_OPTIONS, options);
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
