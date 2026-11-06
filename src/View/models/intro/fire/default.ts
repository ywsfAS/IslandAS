import * as THREE from "three";
import type { ModelOptions } from "../../types";

export const DEFAULT_FIRE_OPTIONS: ModelOptions = {
    asset: "models/intro/fire.glb",
    position: new THREE.Vector3(),
    rotation: new THREE.Euler(),
    scale: new THREE.Vector3(1, 1, 1),
};