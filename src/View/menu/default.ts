import { Vector3 } from 'three';
import type { MenuControl, MenuOptions } from './types';

export const DEFAULT_MENU_OPTIONS: MenuOptions = {
    position: new Vector3(0, 5, 0),
    scale: 0.03,
    showIcon: true,
    iconLabel: 'Show controls',
    iconClassName: 'fa-solid fa-keyboard',
    iconHoverScale: 1.5,
    cardWidth: 300,
    cardPlacement: 'above',
    hideDelayMs: 300,
    animationDuration: 0.24,
};

export const MENU_CONTROLS: MenuControl[] = [
    { name: 'Forward', key: 'W / Arrow Up' },
    { name: 'Back', key: 'S / Arrow Down' },
    { name: 'Left', key: 'A / Arrow Left' },
    { name: 'Right', key: 'D / Arrow Right' },
    { name: 'Jump', key: 'Space' },
    { name: 'Boost', key: 'Shift' },
];
