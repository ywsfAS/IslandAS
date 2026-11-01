import { vec2 } from 'gl-matrix';
import type { ZoneConfig } from '../types';

export const DEFAULT_CONTACT_CONFIGS: ZoneConfig = {
    title: "LET'S CONNECT",
    subtitle: "Have a project in mind or simply want to talk? I'd love to hear from you.",

    center: vec2.fromValues(100, 0),
    radius: 20,
    transitionRadius: 25,
    audioUrl: "/audio/screen-title.mp3"
}