import * as THREE from "three";
import type { ModelOptions } from "../../types";

export const DEFAULT_PLANKS_OPTIONS: ModelOptions = {
    asset: "models/intro/resource-planks.glb",
    position: new THREE.Vector3(),
    rotation: new THREE.Euler(),
    scale: new THREE.Vector3(15, 15, 15),
};
