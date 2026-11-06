import * as THREE from "three";
import type { ModelOptions } from "../../types";

export const DEFAULT_LANTERN_OPTIONS: ModelOptions = {
    asset: "models/contact/lantern.glb",
    position: new THREE.Vector3(),
    rotation: new THREE.Euler(),
    scale: new THREE.Vector3(4, 6, 4),
};
