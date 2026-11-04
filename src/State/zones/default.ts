import { vec2 } from 'gl-matrix';
import type { ZoneConfig } from './types';

export const DEFAULT_ZONE_CONFIGS: ZoneConfig = {
    title: "THE JOURNEY BEGINS",
    subtitle: "A glimpse into who I am and what I create.",

    center: vec2.fromValues(0, 200),
    radius: 70,
    transitionRadius: 25,
    audioUrl: "/audio/screen-title.mp3"
}