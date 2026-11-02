import * as THREE from "three";
import type { ModelOptions } from "../types";

export const DEFAULT_SIGNPOST_SINGLE_OPTIONS: ModelOptions = {
    asset: "models/signpost-single.glb",
    position: new THREE.Vector3(),
    rotation: new THREE.Euler(),
    scale: new THREE.Vector3(5, 5, 5),
};

export const DEFAULT_SIGNPOST_SINGLE_MATERIAL: THREE.MeshStandardMaterialParameters = {
    color: 0xffffff,
    roughness: 0.8,
    metalness: 0,
    fog: false,
    toneMapped: false,
};
