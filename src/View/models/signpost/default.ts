import * as THREE from "three";
import type { ModelOptions } from "../types";

export const DEFAULT_SIGNPOST_OPTIONS: ModelOptions = {
    asset: "models/signpost.glb",
    position: new THREE.Vector3(),
    rotation: new THREE.Euler(),
    scale: new THREE.Vector3(19, 19, 19),
};

export const DEFAULT_SIGNPOST_MATERIAL: THREE.MeshStandardMaterialParameters = {
    color: 0xffffff,
    roughness: 0.8,
    metalness: 0,
    fog: false,
    toneMapped: false,
};
