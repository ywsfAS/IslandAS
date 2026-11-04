import * as THREE from "three";
import type { ModelOptions } from "../../types";

const DEFAULT_BOTTLE_BASE_OPTIONS = {
    position: new THREE.Vector3(),
    rotation: new THREE.Euler(),
    scale: new THREE.Vector3(15, 15, 15),
};

export const BOTTLE_OPTIONS: Record<"small" | "large", ModelOptions> = {
    small: { ...DEFAULT_BOTTLE_BASE_OPTIONS, asset: "models/intro/bottle.glb" },
    large: { ...DEFAULT_BOTTLE_BASE_OPTIONS, asset: "models/intro/bottle-large.glb" },
};
