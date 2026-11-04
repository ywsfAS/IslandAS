import { DEFAULT_INTRO_TREES_CONFIG } from "./default";
import type { IntroTreePosition, IntroTreesOptions } from "./types";

export class IntroTreesState {
    private readonly _positions: IntroTreePosition[];

    constructor({ center, radius, config = {} }: IntroTreesOptions) {
        const settings = { ...DEFAULT_INTRO_TREES_CONFIG, ...config };
        const innerRadius = radius * settings.innerRadiusRatio;
        const outerRadius = radius * settings.outerRadiusRatio;

        this._positions = Array.from({ length: settings.count }, () => {
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.sqrt(
                innerRadius ** 2 + Math.random() * (outerRadius ** 2 - innerRadius ** 2),
            );
            const variant = settings.variants[
                Math.floor(Math.random() * settings.variants.length)
            ];

            return {
                x: center[0] + Math.cos(angle) * distance,
                z: center[1] + Math.sin(angle) * distance,
                rotation: Math.random() * Math.PI * 2,
                scale: variant.minScale + Math.random() * (variant.maxScale - variant.minScale),
                type: variant.type,
            };
        });
    }

    get positions(): readonly IntroTreePosition[] {
        return this._positions;
    }
}
