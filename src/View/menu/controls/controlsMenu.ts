import { DEFAULT_CONTROLS_MENU_OPTIONS, MENU_CONTROLS } from './default';
import { Menu } from '../menu';
import type { MenuOptions } from '../types';

export class ControlsMenu extends Menu {
    public constructor(options: Partial<MenuOptions> = {}) {
        super({
            ...DEFAULT_CONTROLS_MENU_OPTIONS,
            ...options,
            position: options.position?.clone() ?? DEFAULT_CONTROLS_MENU_OPTIONS.position.clone(),
        });
    }

    protected override createContent(): HTMLElement {
        const panel = document.createElement('section');
        Object.assign(panel.style, {
            padding: '14px',
            borderRadius: '8px',
            backgroundColor: 'white',
            color: '#263238',
            fontFamily: '"Nunito", sans-serif',
            fontSize: '13px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        });

        const header = document.createElement('div');
        Object.assign(header.style, {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
        });

        const closeButton = document.createElement('button');
        closeButton.type = 'button';
        closeButton.textContent = '×';
        closeButton.setAttribute('aria-label', 'Close controls');
        closeButton.dataset.cardClose = '';
        Object.assign(closeButton.style, {
            cursor: 'pointer',
            backgroundColor: 'transparent',
            outline: 'none',
            border: 'none',
            fontSize: '18px',
        });

        const title = document.createElement('h2');
        title.textContent = 'IslandAS Controls';
        Object.assign(title.style, {
            margin: '0',
            fontSize: '16px',
            fontWeight: '600',
        });
        header.append(title, closeButton);

        const intro = document.createElement('p');
        intro.textContent = 'Use these controls to move around and explore the island.';
        Object.assign(intro.style, {
            margin: '8px 0 12px',
            color: '#60717d',
            fontSize: '12px',
            lineHeight: '1.4',
        });

        const list = document.createElement('ul');
        Object.assign(list.style, {
            display: 'grid',
            gap: '6px',
            margin: '0',
            padding: '0',
            listStyle: 'none',
        });

        for (const control of MENU_CONTROLS) {
            const item = document.createElement('li');
            Object.assign(item.style, {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                padding: '7px 9px',
                borderRadius: '5px',
                backgroundColor: '#f1f4f6',
            });

            const name = document.createElement('span');
            name.textContent = control.name;

            const key = document.createElement('span');
            key.textContent = control.key;
            Object.assign(key.style, {
                color: '#60717d',
                fontSize: '12px',
                textAlign: 'right',
            });

            item.append(name, key);
            list.append(item);
        }

        panel.append(header, intro, list);
        return panel;
    }
}
