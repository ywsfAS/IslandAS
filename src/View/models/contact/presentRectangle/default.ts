import * as THREE from "three";
import type { ModelOptions } from "../../types";

export const DEFAULT_PRESENT_RECTANGLE_OPTIONS: ModelOptions = {
    asset: "models/contact/present-a-rectangle.glb",
    position: new THREE.Vector3(),
    rotation: new THREE.Euler(),
    scale: new THREE.Vector3(4, 4, 4),
};
