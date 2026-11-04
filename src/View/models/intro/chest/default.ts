import * as THREE from "three";
import type { ModelOptions } from "../../types";

export const DEFAULT_CHEST_OPTIONS: ModelOptions = {
    asset: "models/intro/chest.glb",
    position: new THREE.Vector3(),
    rotation: new THREE.Euler(),
    scale: new THREE.Vector3(15, 15, 15),
};
