import { vec2 } from 'gl-matrix';
import type { ZoneConfig } from '../types';

export const DEFAULT_CONTACT_CONFIGS: ZoneConfig = {
    title: "LET'S CONNECT",
    subtitle: "Every great project starts with a conversation.",

    center: vec2.fromValues(100, 0),
    radius: 40,
    transitionRadius: 25,
    audioUrl: "/audio/screen-title.mp3"
}