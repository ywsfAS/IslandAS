import type { vec2 } from "gl-matrix";

export type IntroTreeType = "tree" | "tree-trunk";

export interface IntroTreePosition {
    x: number;
    z: number;
    rotation: number;
    scale: number;
    type: IntroTreeType;
}

export interface IntroTreeVariant {
    type: IntroTreeType;
    minScale: number;
    maxScale: number;
}

export interface IntroTreesConfig {
    count: number;
    innerRadiusRatio: number;
    outerRadiusRatio: number;
    variants: readonly IntroTreeVariant[];
}

export interface IntroTreesOptions {
    center: vec2;
    radius: number;
    config?: Partial<IntroTreesConfig>;
}
