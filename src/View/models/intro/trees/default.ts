import * as THREE from "three";
import type { ModelOptions } from "../../types";
import type { IntroTreeType } from "./types";

export const DEFAULT_INTRO_TREE_OPTIONS: Record<IntroTreeType, ModelOptions> = {
    tree: {
        asset: "models/tree.glb",
        position: new THREE.Vector3(),
        rotation: new THREE.Euler(),
        scale: new THREE.Vector3(1, 1, 1),
    },
    "tree-trunk": {
        asset: "models/intro/tree-trunk.glb",
        position: new THREE.Vector3(),
        rotation: new THREE.Euler(),
        scale: new THREE.Vector3(1, 1, 1),
    },
};

export const DEFAULT_INTRO_TREE_MATERIAL: THREE.MeshStandardMaterialParameters = {
    color: 0x6b4423,
    roughness: 0.8,
    metalness: 0,
    fog: false,
    toneMapped: false,
    side: THREE.DoubleSide,
};
