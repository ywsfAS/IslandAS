import { InteractiveCard } from '../cards/interactiveCard';
import type { MenuOptions } from './types';
import { DEFAULT_MENU_OPTIONS } from './default';
import { gsap } from 'gsap';
import type { AudioManager } from '../../state/audio/audioManager';
import { State } from '../../state/state';

export abstract class Menu extends InteractiveCard<MenuOptions> {
    private _titleDelay?: gsap.core.Tween;
    private readonly _audio: AudioManager;

    public constructor(options: Partial<MenuOptions> = {}) {
        super({
            ...DEFAULT_MENU_OPTIONS,
            ...options,
            position: options.position?.clone() ?? DEFAULT_MENU_OPTIONS.position.clone(),
        }, true);
        const state = State.getInstance();
        this._audio = state.audioManager;
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
        title.textContent = options.iconTitle;
        title.dataset.menuTitle = '';
        button.append(square, title);
        gsap.set(icon, { scale: 0 });
        gsap.set(title, { autoAlpha: 0, scale: 0 });

        this.registerEvent(button);
        return button;
    }
    private registerEvent(el: HTMLElement) {
        el.addEventListener('click', () => this.onIconClick());
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
                xPercent: 0,
                yPercent: -50,

                autoAlpha: 1,
                scale: 1,
                duration: 0.18,
                ease: 'back.out(1.7)',
            });
        });


        void this._audio.play("/audio/click.mp3").catch((error: unknown) => {
            console.error("Failed to play menu hover sound:", error);
        });
    }
    public onIconClick = (): void => {
    }
    protected abstract override createContent(options: MenuOptions): HTMLElement;
}
