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
                this.getWeightedRandom(90, 10)
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

    private getWeightedRandom(w1: number, w2: number) {
        return Math.random() * (w1 + w2) < w1 ? 0 : 1;
    }

    get positions(): readonly IntroTreePosition[] {
        return this._positions;
    }
}
