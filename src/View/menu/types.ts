import type { InteractiveCardOptions } from '../cards/types';

export interface MenuOptions extends InteractiveCardOptions {
    iconTitle: string;
    contentTitle?: string;
    contentMessage?: string;
}

export interface MenuControl {
    name: string;
    key: string;
}
