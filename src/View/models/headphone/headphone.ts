import type { InteractiveCard } from "../../cards/interactiveCard";
import { createIntroMenuOptions } from "../../menu/intro/default";
import { IntroMenu } from "../../menu/intro/introMenu";
import { Model } from "../model";
import { DEFAULT_KEYBOARD_OPTIONS } from './default';
import type { HeadphoneOptions } from "./types";
import * as THREE from 'three';
import { State } from "../../../state/state";

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
            'Music is part of my everyday life. It helps me focus, relax, and find inspiration along the way.',
            Headphone.addSoundUI()
        ))
    }
    private static addSoundUI(): HTMLElement {
        const container = document.createElement('div');
        const state = State.getInstance();
        Object.assign(container.style, {
            display: 'grid',
            gap: '10px',
            marginTop: '12px',
            fontSize: '12px',
        });

        const soundRow = document.createElement('label');
        Object.assign(soundRow.style, {
            display: 'grid',
            gap: '5px',
            minWidth: '0',
        });
        const soundLabel = document.createElement('span');
        soundLabel.textContent = 'Main sound';
        soundRow.append(soundLabel);

        const soundSelect = document.createElement('select');
        soundSelect.setAttribute('aria-label', 'Main sound');
        Object.assign(soundSelect.style, {
            width: '100%',
            minWidth: '0',
            boxSizing: 'border-box',
            padding: '7px 30px 7px 9px',
            border: '1px solid #cbd5dc',
            borderRadius: '4px',
            background: 'white',
            color: '#263238',
            font: 'inherit',
            cursor: 'pointer',
        });

        const sounds = [
            { path: '/audio/exploration-joy.mp3', title: 'Exploration' },
            { path: '/audio/screen-title.mp3', title: 'Screen title' },
            { path: '/audio/discovery.wav', title: 'Discovery' },
            { path: '/audio/secret.wav', title: 'Secret' },
        ];
        for (const sound of sounds) {
            const option = document.createElement('option');
            option.value = sound.path;
            option.textContent = sound.title;
            soundSelect.append(option);
        }
        soundSelect.value = state.mainAudioPath;
        soundSelect.addEventListener('change', () => {
            void state.playMainAudio(soundSelect.value).catch((error: unknown) => {
                console.error('Failed to change main audio:', error);
                soundSelect.value = state.mainAudioPath;
            });
        });
        soundRow.append(soundSelect);
        container.append(soundRow);

        const createVolumeRow = (
            title: string,
            initialValue: number,
            onChange: (value: number) => void,
        ): HTMLElement => {
            const row = document.createElement('label');
            Object.assign(row.style, {
                display: 'grid',
                gap: '4px',
            });

            const heading = document.createElement('span');
            heading.textContent = title;

            const slider = document.createElement('input');
            slider.type = 'range';
            slider.min = '0';
            slider.max = '1';
            slider.step = '0.01';
            slider.value = String(initialValue);
            slider.setAttribute('aria-label', `${title} volume`);
            slider.addEventListener('input', () => onChange(Number(slider.value)));

            row.append(heading, slider);
            return row;
        };

        container.append(
            createVolumeRow('Main audio volume', state.mainAudioVolume, volume => {
                state.setMainAudioVolume(volume);
            }),
            createVolumeRow('Zone audio volume', state.zoneAudioVolume, volume => {
                state.setZoneAudioVolume(volume);
            }),
        );

        return container;
    }
}