import { vec2 } from 'gl-matrix';
import type { ZoneConfig } from './types';

export const DEFAULT_ZONE_CONFIGS: ZoneConfig = {
    title: "Intro",
    subtitle: "this a simple introduction about me",

    center: vec2.fromValues(30, 0),
    radius: 5,
    transitionRadius: 25,
}