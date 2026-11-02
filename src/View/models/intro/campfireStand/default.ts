import * as THREE from "three";
import type { ModelOptions } from "../../types";

export const DEFAULT_CAMPFIRE_STAND_OPTIONS: ModelOptions = {
    asset: "models/intro/campfire-stand.glb",
    position: new THREE.Vector3(),
    rotation: new THREE.Euler(),
    scale: new THREE.Vector3(8, 8, 8),
};

export const DEFAULT_CAMPFIRE_STAND_MATERIAL: THREE.MeshStandardMaterialParameters = {
    color: 0xffffff,
    roughness: 0.8,
    metalness: 0,
    fog: false,
    toneMapped: false,
};
