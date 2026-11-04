import * as THREE from "three";
import type { ModelOptions } from "../../types";

export const DEFAULT_TOOL_AXE_OPTIONS: ModelOptions = {
    asset: "models/intro/tool-axe.glb",
    position: new THREE.Vector3(),
    rotation: new THREE.Euler(),
    scale: new THREE.Vector3(12, 12, 12),
};

export const DEFAULT_TOOL_AXE_MATERIAL: THREE.MeshStandardMaterialParameters = {
    color: 0xffffff,
    roughness: 0.8,
    metalness: 0,
    fog: false,
    toneMapped: false,
};
