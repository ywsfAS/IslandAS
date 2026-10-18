import * as THREE from 'three';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import type { LogoInteractionOptions } from './types';
import type { CameraState } from '../../state/camera/camera';
import { State } from '../../state/state';

const HIDE_DELAY_MS = 200;

export class LogoHoverCard {
    private readonly _element: HTMLDivElement;
    private readonly _object: CSS3DObject;
    private _hideTimeout: ReturnType<typeof setTimeout> | undefined;
    private _pointerInside = false;

    private readonly _camera: CameraState;

    constructor(
        scene: THREE.Scene,
        options: LogoInteractionOptions,
        position: THREE.Vector3,
    ) {

        const state = State.getInstance();

        this._camera = state.camera;

        this._element = document.createElement('div');
        Object.assign(this._element.style, {
            width: '220px',
            padding: '14px',
            border: 'none',
            borderRadius: '8px',
            backgroundColor: '#fff',
            color: '#263238',
            fontFamily: '"Nunito", sans-serif',
            fontSize: '13px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            pointerEvents: 'auto',
            opacity: '0',
            visibility: 'hidden',
            transition: 'opacity 120ms ease',
        });

        const intro = document.createElement('p');
        intro.textContent = options.intro;
        Object.assign(intro.style, {
            margin: '0 0 8px',
            color: '#60717d',
            fontSize: '12px',
            lineHeight: '1.4',
        });

        const message = document.createElement('div');
        message.textContent = options.message;
        Object.assign(message.style, {
            marginBottom: '10px',
            fontSize: '13px',
            lineHeight: '1.45',
        });

        const link = document.createElement('a');
        link.href = options.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = options.linkText;
        Object.assign(link.style, {
            display: 'inline-block',
            padding: '6px 9px',
            borderRadius: '3px',
            backgroundColor: '#111',
            color: '#fff',
            fontFamily: 'inherit',
            fontSize: '12px',
            fontWeight: '600',
            lineHeight: '1.2',
            textDecoration: 'none',
            cursor: 'pointer',
        });

        this._element.append(intro, message, link);
        this._element.addEventListener('pointerenter', this.onPointerEnter);
        this._element.addEventListener('pointerleave', this.onPointerLeave);

        this._object = new CSS3DObject(this._element);
        this._object.position.copy(position);
        this._object.scale.setScalar(0.03);
        scene.add(this._object);
    }

    private readonly onPointerEnter = (): void => {
        this._pointerInside = true;
        this.cancelHide();
    };

    private readonly onPointerLeave = (): void => {
        this._pointerInside = false;
        this.scheduleHide();
    };

    public show(): void {
        this.cancelHide();
        this._element.style.visibility = 'visible';
        this._element.style.opacity = '1';
    }

    public hide(): void {
        this.scheduleHide();
    }

    private scheduleHide(): void {
        this.cancelHide();
        if (this._pointerInside) return;

        this._hideTimeout = setTimeout(() => {
            this._element.style.opacity = '0';
            this._element.style.visibility = 'hidden';
            this._hideTimeout = undefined;
        }, HIDE_DELAY_MS);
    }

    private cancelHide(): void {
        if (this._hideTimeout === undefined) return;
        clearTimeout(this._hideTimeout);
        this._hideTimeout = undefined;
    }
    public update() {

        const [qx, qy, qz, qw] = this._camera.quaterion;
        this._object?.quaternion.set(qx, qy, qz, qw);
    }
}
