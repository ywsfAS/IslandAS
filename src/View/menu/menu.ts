import { State } from '../../state/state';
import { View } from '../view';
import { InteractiveCard } from '../cards/interactiveCard';
import type { MenuOptions } from './types';
import { DEFAULT_MENU_OPTIONS, MENU_CONTROLS } from './default';
import { Github } from '../logos/github/github';
import { Linkedin } from '../logos/linkedin/linkedin';
import { TypeScriptLogo } from '../logos/typescript/typescript';
import type { Logo } from '../logos/logo';
import { gsap } from 'gsap';

export class Menu extends InteractiveCard<MenuOptions> {
    private readonly _logos: Logo[];
    private _titleDelay?: gsap.core.Tween;

    constructor(options: Partial<MenuOptions> = {}) {
        const view = View.getInstance();
        super(
            view.scene,
            State.getInstance().camera,
            view.cards,
            {
                ...DEFAULT_MENU_OPTIONS,
                ...options,
                position: options.position?.clone() ?? DEFAULT_MENU_OPTIONS.position.clone(),
            },
        );

        this._logos = [
            new Github(),
            new Linkedin(),
            new TypeScriptLogo(),
        ];
    }

    protected override createIcon(options: MenuOptions): HTMLButtonElement {
        const button = document.createElement('button');
        button.type = 'button';
        button.setAttribute('aria-label', options.iconLabel);

        const square = document.createElement('span');
        square.dataset.menuSquare = '';
        const icon = document.createElement('i');
        icon.className = options.iconClassName;
        icon.setAttribute('aria-hidden', 'true');
        square.append(icon);

        const title = document.createElement('span');
        title.textContent = 'Controls';
        title.dataset.menuTitle = '';
        button.append(square, title);
        gsap.set(icon, { scale: 0 });
        gsap.set(title, { autoAlpha: 0, scale: 0 });
        return button;
    }

    protected override styleIcon(icon: HTMLButtonElement): void {
        Object.assign(icon.style, {
            position: 'relative',
            display: 'block',
            width: '70px',
            height: '70px',
            padding: '0',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            pointerEvents: 'auto',
            transformOrigin: 'center',
        });

        const square = icon.querySelector<HTMLElement>('[data-menu-square]');
        const symbol = icon.querySelector('i');
        const title = icon.querySelector<HTMLElement>('[data-menu-title]');
        if (!square || !symbol || !title) return;

        Object.assign(square.style, {
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '50px',
            height: '50px',
            border: '10px solid black',
            background: 'white',
            color: 'black',
            transform: 'translate(-50%,-50%) rotate(-45deg)',
            transformOrigin: 'center',
            zIndex: "999",
            'backface-visibility': 'hidden'
        });
        Object.assign(symbol.style, {
            display: 'grid',
            placeItems: 'center',
            width: '100%',
            height: '100%',
            transformOrigin: 'center',
            fontSize: '18px',
            rotate: '45deg'
        });

        Object.assign(title.style, {
            position: 'absolute',
            top: '50%',
            left: '50%',
            padding: '10px 20px 10px 50px',
            borderRadius: '4px',
            backgroundColor: 'black',
            color: 'white',
            fontSize: '17px',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            transformOrigin: 'center center',
        });
    }

    protected override onHover(hovered: boolean): void {
        this._titleDelay?.kill();
        this._titleDelay = undefined;

        const icon = this.icon?.querySelector('i');
        const title = this.icon?.querySelector<HTMLElement>('[data-menu-title]');
        if (!icon || !title) return;

        if (!hovered) {
            gsap.to(icon, {
                scale: 0,
                duration: 0.16,
                ease: 'power2.in',
            });
            gsap.to(title, {
                xPercent: 0,
                yPercent: -50,

                autoAlpha: 0,
                scale: 0,
                duration: 0.16,
                ease: 'power2.in',
            });
            return;
        }

        gsap.to(icon, {
            scale: 1,
            duration: 0.2,
            ease: 'back.out(1.7)',
        });
        this._titleDelay = gsap.delayedCall(0.25, () => {
            this._titleDelay = undefined;
            gsap.to(title, {
                autoAlpha: 1,
                scale: 1,
                duration: 0.18,
                ease: 'back.out(1.7)',
            });
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

    public updateLogos(): void {
        this._logos.forEach(logo => logo.update());
    }
}
