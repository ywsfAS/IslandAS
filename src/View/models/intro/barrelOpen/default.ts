import * as THREE from "three";
import type { ModelOptions } from "../../types";

export const DEFAULT_BARREL_OPEN_OPTIONS: ModelOptions = {
    asset: "models/intro/barrel-open.glb",
    position: new THREE.Vector3(),
    rotation: new THREE.Euler(),
    scale: new THREE.Vector3(10, 10, 10),
};

export const DEFAULT_BARREL_OPEN_MATERIAL: THREE.MeshStandardMaterialParameters = {
    color: 0xffffff,
    roughness: 0.8,
    metalness: 0,
    fog: false,
    toneMapped: false,
};
