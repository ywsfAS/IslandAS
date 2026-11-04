import * as THREE from "three"; import type { ModelOptions } from "../../types";

export const DEFAULT_BOX_OPTIONS = {
    position: new THREE.Vector3(),
    rotation: new THREE.Euler(),
    scale: new THREE.Vector3(20, 20, 20),
};


export const DEFAULT_BOX_NORMAL_CLOSED_OPTIONS: ModelOptions = { ...DEFAULT_BOX_OPTIONS, asset: "models/intro/box-large.glb" };
export const DEFAULT_BOX_NORMAL_OPEN_OPTIONS: ModelOptions = { ...DEFAULT_BOX_OPTIONS, asset: "models/intro/box-large-open.glb" };
export const DEFAULT_BOX_SMALL_CLOSED_OPTIONS: ModelOptions = { ...DEFAULT_BOX_OPTIONS, asset: "models/intro/box.glb" };
export const DEFAULT_BOX_SMALL_OPEN_OPTIONS: ModelOptions = { ...DEFAULT_BOX_OPTIONS, asset: "models/intro/box-open.glb" };

export const BOX_OPTIONS = {
    normal: {
        open: DEFAULT_BOX_NORMAL_OPEN_OPTIONS,
        closed: DEFAULT_BOX_NORMAL_CLOSED_OPTIONS
    },
    small: {
        open: DEFAULT_BOX_SMALL_OPEN_OPTIONS,
        closed: DEFAULT_BOX_SMALL_CLOSED_OPTIONS
    }

} as const;