import type { InteractiveCard } from "../../cards/interactiveCard";
import { createIntroMenuOptions } from "../../menu/intro/default";
import { IntroMenu } from "../../menu/intro/introMenu";
import { Model } from "../model";
import { DEFAULT_KEYBOARD_OPTIONS } from './default';
import type { HeadphoneOptions } from "./types";
import * as THREE from 'three';

export class Headphone extends Model {
    private readonly _menu: InteractiveCard;
    constructor(options: HeadphoneOptions = {}) {
        super(DEFAULT_KEYBOARD_OPTIONS, options);
        const modelPosition = this._options.position;
        const menuPosition = new THREE.Vector3(modelPosition.x + 4, modelPosition.y + 4, modelPosition.z);
        this._menu = new IntroMenu(createIntroMenuOptions(
            menuPosition,
            'The Soundtrack',
            'Listen',
            'fa-solid fa-headphones',
            'Music',
            'Music is part of my everyday life. It helps me focus, relax, and find inspiration along the way.'
        ))
    }
}