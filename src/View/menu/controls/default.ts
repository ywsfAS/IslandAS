import { DEFAULT_MENU_OPTIONS } from '../default';
import type { MenuControl, MenuOptions } from '../types';

export const DEFAULT_CONTROLS_MENU_OPTIONS: MenuOptions = {
    ...DEFAULT_MENU_OPTIONS,
    iconLabel: 'Show controls',
    iconTitle: 'Controls',
    iconClassName: 'fa-solid fa-keyboard',
    iconHoverScale: 1.5,
    cardWidth: 300,
    cardPlacement: 'above',
    hideDelayMs: 300,
};

export const MENU_CONTROLS: MenuControl[] = [
    { name: 'Forward', key: 'W / Arrow Up' },
    { name: 'Back', key: 'S / Arrow Down' },
    { name: 'Left', key: 'A / Arrow Left' },
    { name: 'Right', key: 'D / Arrow Right' },
    { name: 'Jump', key: 'Space' },
    { name: 'Boost', key: 'Shift' },
];