import type { Vector3 } from 'three';
import { DEFAULT_MENU_OPTIONS } from '../default';
import type { MenuOptions } from '../types';

export const createIntroMenuOptions = (
    position: Vector3,
    iconLabel: string,
    iconTitle: string,
    iconClassName: string,
    contentTitle: string,
    contentMessage: string,
): MenuOptions => ({
    ...DEFAULT_MENU_OPTIONS,
    position,
    iconLabel,
    iconTitle,
    iconClassName,
    iconHoverScale: 1.5,
    cardWidth: 300,
    cardPlacement: 'above',
    hideDelayMs: 300,
    contentTitle,
    contentMessage,
});
