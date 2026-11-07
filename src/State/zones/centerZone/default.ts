import { vec2 } from 'gl-matrix';
import type { ZoneConfig } from '../types';

export const DEFAULT_CENTER_ZONE_CONFIGS: ZoneConfig = {
    title: "THE HEART OF THE ISLAND",
    subtitle: "The center of the island, where every journey begins.",

    center: vec2.fromValues(0, 0),
    radius: 25,
    transitionRadius: 25,
    audioUrl: "/audio/screen-title.mp3"
};
