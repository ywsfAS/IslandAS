import { Vector3 } from 'three';
import type { InteractiveCardOptions } from './types';

export const DEFAULT_INTERACTIVE_CARD_OPTIONS: InteractiveCardOptions = {
    position: new Vector3(),
    scale: 0.03,
    showIcon: true,
    iconLabel: 'Open card',
    iconClassName: '',
    iconHoverScale: 1.08,
    cardWidth: 240,
    cardPlacement: 'right',
    hideDelayMs: 200,
    animationDuration: 0.24,
};
