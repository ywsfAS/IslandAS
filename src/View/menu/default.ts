import { Vector3 } from 'three';
import type { MenuOptions } from './types';

export const DEFAULT_MENU_OPTIONS: MenuOptions = {
    position: new Vector3(0, 5, 0),
    scale: 0.03,
    showIcon: true,
    iconLabel: 'Open menu',
    iconTitle: 'Menu',
    iconClassName: '',
    iconHoverScale: 1.08,
    cardWidth: 240,
    cardPlacement: 'right',
    hideDelayMs: 200,
    animationDuration: 0.24,
};
