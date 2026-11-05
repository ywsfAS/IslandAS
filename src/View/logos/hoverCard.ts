import type { Vector3 } from 'three';
import { InteractiveCard } from '../cards/interactiveCard';
import { DEFAULT_INTERACTIVE_CARD_OPTIONS } from '../cards/default';
import type { InteractiveCardOptions } from '../cards/types';
import type { LogoInteractionOptions } from './types';

type LogoHoverCardOptions = InteractiveCardOptions & LogoInteractionOptions;

export class LogoHoverCard extends InteractiveCard<LogoHoverCardOptions> {
    constructor(
        options: LogoInteractionOptions,
        position: Vector3,
    ) {
        super({
            ...DEFAULT_INTERACTIVE_CARD_OPTIONS,
            position: position.clone(),
            showIcon: false,
            cardWidth: 220,
            cardPlacement: 'above',
            ...options,
        });
    }

    protected override createContent(options: LogoHoverCardOptions): HTMLElement {
        const card = document.createElement('div');
        Object.assign(card.style, {
            padding: '14px',
            border: 'none',
            borderRadius: '8px',
            backgroundColor: '#fff',
            color: '#263238',
            fontFamily: '"Nunito", sans-serif',
            fontSize: '13px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
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

        card.append(intro, message, link);
        return card;
    }
}
