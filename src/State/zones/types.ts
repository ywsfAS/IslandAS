import type { vec2 } from "gl-matrix";

export interface ZoneConfig {
    title: string;
    subtitle: string;

    radius: number;
    transitionRadius: number;

    center: vec2;
}