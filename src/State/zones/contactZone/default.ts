import { vec2 } from 'gl-matrix';
import type { ZoneConfig } from '../types';

export const DEFAULT_CONTACT_CONFIGS: ZoneConfig = {

    title: "LET'S CONNECT",
    subtitle: "Every new journey starts with a hello.",

    center: vec2.fromValues(200, 0),
    radius: 50,
    transitionRadius: 25,
    audioUrl: "/audio/screen-title.mp3"
}