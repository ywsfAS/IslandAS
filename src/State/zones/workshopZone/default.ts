import { vec2 } from 'gl-matrix';
import type { ZoneConfig } from '../types';

export const DEFAULT_WORKSHOP_CONFIGS: ZoneConfig = {
    title: "THE WORKSHOP",
    subtitle: "Where ideas take shape, experiments come to life, and creativity meets codes",

    center: vec2.fromValues(-200, 0),
    radius: 50,
    transitionRadius: 25,
    audioUrl: "/audio/screen-title.mp3"
}