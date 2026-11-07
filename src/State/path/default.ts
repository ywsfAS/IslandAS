import { vec3 } from 'gl-matrix';
import type { PathStateOptions } from './types';
import type { ZoneConfig } from '../zones/types';
import { DEFAULT_CENTER_ZONE_CONFIGS } from '../zones/centerZone/default';
import { DEFAULT_ZONE_CONFIGS } from '../zones/default';
import { DEFAULT_CONTACT_CONFIGS } from '../zones/contactZone/default';
import { DEFAULT_WORKSHOP_CONFIGS } from '../zones/workshopZone/default';

function createRoutePoints(destination: ZoneConfig, bend: number): vec3[] {
    const center = DEFAULT_CENTER_ZONE_CONFIGS.center;
    const dx = destination.center[0] - center[0];
    const dz = destination.center[1] - center[1];
    const distance = Math.hypot(dx, dz);
    const directionX = dx / distance;
    const directionZ = dz / distance;

    const startX = center[0] + directionX * DEFAULT_CENTER_ZONE_CONFIGS.radius;
    const startZ = center[1] + directionZ * DEFAULT_CENTER_ZONE_CONFIGS.radius;
    const endX = destination.center[0] - directionX * destination.radius;
    const endZ = destination.center[1] - directionZ * destination.radius;
    const perpendicularX = -directionZ;
    const perpendicularZ = directionX;

    return [0, 1 / 3, 2 / 3, 1].map((progress) => {
        const curveOffset = bend * Math.sin(Math.PI * progress);
        const x = startX + (endX - startX) * progress + perpendicularX * curveOffset;
        const z = startZ + (endZ - startZ) * progress + perpendicularZ * curveOffset;
        return vec3.fromValues(x, 0, z);
    });
}

export const DEFAULT_PATH_CONFIG: PathStateOptions = {
    points: createRoutePoints(DEFAULT_ZONE_CONFIGS, 5),
    width: 10,
    closed: false,
    curveType: 'centripetal',
    tension: 0.5,
    samples: 200,
    widthSegments: 4,
    uvScale: 4,
    yOffset: 0.3,
    smoothness: 0.2
};

export const DEFAULT_CONTACT_PATH_CONFIG: PathStateOptions = {
    ...DEFAULT_PATH_CONFIG,
    points: createRoutePoints(DEFAULT_CONTACT_CONFIGS, 3),
};

export const DEFAULT_WORKSHOP_PATH_CONFIG: PathStateOptions = {
    ...DEFAULT_PATH_CONFIG,
    points: createRoutePoints(DEFAULT_WORKSHOP_CONFIGS, 3),
};