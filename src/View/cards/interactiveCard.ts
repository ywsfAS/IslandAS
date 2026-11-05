import { gsap } from 'gsap';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import type { CameraState } from '../../state/camera/camera';
import type { Scene } from 'three';
import { DEFAULT_INTERACTIVE_CARD_OPTIONS } from './default';
import type { InteractiveCardOptions } from './types';
import type { Cards } from './cards';

export abstract class InteractiveCard<
    Options extends InteractiveCardOptions = InteractiveCardOptions,
> {
    private readonly _scene: Scene;
    private readonly _camera: CameraState;
    private readonly _cards: Cards;
    private readonly _options: Options;
    private readonly _object: CSS3DObject;
    private readonly _container: HTMLDivElement;
    private readonly _icon?: HTMLButtonElement;
    private readonly _content: HTMLElement;
    private _hideTween?: gsap.core.Tween;

    protected constructor(
        scene: Scene,
        camera: CameraState,
        cards: Cards,
        options: Options,
    ) {
        this._scene = scene;
        this._camera = camera;
        this._cards = cards;
        this._options = {
            ...DEFAULT_INTERACTIVE_CARD_OPTIONS,
            ...options,
            position: options.position.clone(),
        };

        this._container = document.createElement('div');
        Object.assign(this._container.style, {
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
            pointerEvents: 'none',
        });

        if (this._options.showIcon) {
            this._icon = this.createIcon(this._options);
            this.styleIcon(this._icon);
            this._container.append(this._icon);
        }

        this._content = this.createContent(this._options);
        Object.assign(this._content.style, {
            position: this._options.showIcon ? 'absolute' : 'relative',
            left: this._options.showIcon && this._options.cardPlacement === 'right'
                ? 'calc(100% + 60px)'
                : this._options.showIcon && this._options.cardPlacement === 'above'
                    ? '50%'
                    : '0',
            top: this._options.showIcon && this._options.cardPlacement === 'right'
                ? '50%'
                : 'auto',
            bottom: this._options.showIcon && this._options.cardPlacement === 'above'
                ? 'calc(100% + 60px)'
                : 'auto',
            width: `${this._options.cardWidth}px`,
            pointerEvents: 'auto',
            transformOrigin: this._options.cardPlacement === 'above'
                ? 'bottom center'
                : 'left center',
        });
        this._container.append(this._content);

        this._object = new CSS3DObject(this._container);
        this._object.position.copy(this._options.position);
        this._object.scale.setScalar(this._options.scale);
        this._scene.add(this._object);

        gsap.set(this._content, {
            autoAlpha: 0,
            scale: 0.94,
            y: 8,
            yPercent: this._options.showIcon && this._options.cardPlacement === 'right'
                ? -50
                : 0,
            xPercent: this._options.showIcon && this._options.cardPlacement === 'above'
                ? -50
                : 0,
        });
        this._content.style.pointerEvents = 'none';

        this._container.addEventListener('pointerenter', this.onPointerEnter);
        this._container.addEventListener('pointerleave', this.onPointerLeave);
        this._content.addEventListener('click', this.onContentClick);
        this._cards.register(this);
    }

    protected createIcon(options: Options): HTMLButtonElement {
        const button = document.createElement('button');
        button.type = 'button';
        button.setAttribute('aria-label', options.iconLabel);
        if (options.iconClassName) {
            const icon = document.createElement('i');
            icon.className = options.iconClassName;
            icon.setAttribute('aria-hidden', 'true');
            button.append(icon);
        }
        return button;
    }

    protected styleIcon(icon: HTMLButtonElement): void {
        Object.assign(icon.style, {
            display: 'grid',
            placeItems: 'center',
            width: '42px',
            height: '42px',
            padding: '0',
            border: '2px solid #111',
            borderRadius: '6px',
            background: '#fff',
            color: '#111',
            fontSize: '17px',
            cursor: 'pointer',
            pointerEvents: 'auto',
            transformOrigin: 'center',
        });
    }

    protected get icon(): HTMLButtonElement | undefined {
        return this._icon;
    }

    protected abstract createContent(options: Options): HTMLElement;

    protected onHover(_hovered: boolean): void { }

    public show(): void {
        this.cancelHide();
        this._content.style.pointerEvents = 'auto';
        gsap.killTweensOf(this._content);
        gsap.to(this._content, {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            yPercent: this._options.showIcon && this._options.cardPlacement === 'right'
                ? -50
                : 0,
            xPercent: this._options.showIcon && this._options.cardPlacement === 'above'
                ? -50
                : 0,
            duration: this._options.animationDuration,
            ease: 'power2.out',
        });
        if (this._icon) {
            gsap.killTweensOf(this._icon);
            gsap.to(this._icon, {
                scale: this._options.iconHoverScale,
                duration: this._options.animationDuration,
                ease: 'back.out(2)',
            });
        }
        this.onHover(true);
    }

    public hide(): void {
        this.cancelHide();
        this._hideTween = gsap.delayedCall(this._options.hideDelayMs / 1000, () => {
            this._hideTween = undefined;
            gsap.killTweensOf(this._content);
            gsap.to(this._content, {
                autoAlpha: 0,
                scale: 0.94,
                y: 8,
                yPercent: this._options.showIcon && this._options.cardPlacement === 'right'
                    ? -50
                    : 0,
                xPercent: this._options.showIcon && this._options.cardPlacement === 'above'
                    ? -50
                    : 0,
                duration: this._options.animationDuration,
                ease: 'power2.in',
                onComplete: () => {
                    this._content.style.pointerEvents = 'none';
                },
            });
            if (this._icon) {
                gsap.killTweensOf(this._icon);
                gsap.to(this._icon, {
                    scale: 1,
                    duration: this._options.animationDuration,
                    ease: 'power2.out',
                });
            }
            this.onHover(false);
        });
    }

    public destroy(): void {
        this.cancelHide();
        gsap.killTweensOf(this._content);
        if (this._icon) gsap.killTweensOf(this._icon);
        this._scene.remove(this._object);
        this._cards.remove(this);
    }

    public update(): void {
        const [qx, qy, qz, qw] = this._camera.quaterion;
        this._object.quaternion.set(qx, qy, qz, qw);
    }

    private readonly onPointerEnter = (): void => {
        this.show();
    };

    private readonly onPointerLeave = (): void => {
        this.hide();
    };

    private readonly onContentClick = (event: MouseEvent): void => {
        const target = event.target;
        if (target instanceof Element && target.closest('[data-card-close]')) {
            this.hide();
        }
    };

    private cancelHide(): void {
        this._hideTween?.kill();
        this._hideTween = undefined;
    }
}
