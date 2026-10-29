import type { BushViewOptions } from './types';

export const DEFAULT_BUSH_VIEW_OPTIONS: BushViewOptions = {
    radius: 6,
    bushHeight: 1.8,
    floorHeight: -0.1,
    groundSink: 0.25,

    leafCount: 250,
    leafLength: 0.13,
    leafWidthRatio: 0.65,
    leafSizeVariation: 0.12,

    clumpCount: 0.5,
    clumpSpread: 0.8,
    clumpMinRadius: 0.2,
    clumpMaxRadius: 0.3,

    deepColor: '#2a410b',
    standardColor: '#5a8c09',
    lightColor: '#6e9c04',

    castShadow: false,
    receiveShadow: true,
};