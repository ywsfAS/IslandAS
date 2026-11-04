import * as THREE from "three";
import type { ModelOptions } from "../../types";

export const DEFAULT_FLOOR_OPTIONS: ModelOptions = {
    asset: "models/intro/floor.glb",
    position: new THREE.Vector3(),
    rotation: new THREE.Euler(),
    scale: new THREE.Vector3(16, 16, 16),
};

export const DEFAULT_FLOOR_MATERIAL: THREE.MeshStandardMaterialParameters = {
    color: 0xffffff,
    roughness: 0.8,
    metalness: 0,
    fog: false,
    toneMapped: false,
};