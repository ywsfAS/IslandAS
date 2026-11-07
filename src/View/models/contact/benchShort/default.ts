import * as THREE from "three";
import type { ModelOptions } from "../../types";

export const DEFAULT_BENCH_SHORT_OPTIONS: ModelOptions = {
    asset: "models/contact/bench-short.glb",
    position: new THREE.Vector3(),
    rotation: new THREE.Euler(),
    scale: new THREE.Vector3(6, 6, 6),
};
