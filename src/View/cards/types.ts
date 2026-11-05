import type { Vector3 } from 'three';

export type InteractiveCardPlacement = 'right' | 'above';

export interface InteractiveCardOptions {
    position: Vector3;
    scale: number;
    showIcon: boolean;
    iconLabel: string;
    iconClassName: string;
    iconHoverScale: number;
    cardWidth: number;
    cardPlacement: InteractiveCardPlacement;
    hideDelayMs: number;
    animationDuration: number;
}
