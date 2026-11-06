import * as THREE from "three";
import type { ModelOptions } from "../../types";

export const DEFAULT_WREATH_OPTIONS: ModelOptions = {
    asset: "models/contact/wreath.glb",
    position: new THREE.Vector3(),
    rotation: new THREE.Euler(),
    scale: new THREE.Vector3(5, 5, 5),
};
