import * as THREE from "three";
import type { ModelOptions } from "../../types";

export const DEFAULT_STALL_BENCH_OPTIONS: ModelOptions = {
    asset: "models/contact/stall-bench.glb",
    position: new THREE.Vector3(),
    rotation: new THREE.Euler(),
    scale: new THREE.Vector3(10, 10, 10),
};
