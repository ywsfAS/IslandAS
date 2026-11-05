import type { InteractiveCard } from './interactiveCard';

export class Cards {
    private readonly _cards = new Set<InteractiveCard>();

    public register(card: InteractiveCard): void {
        this._cards.add(card);
    }

    public remove(card: InteractiveCard): void {
        this._cards.delete(card);
    }

    public update(): void {
        for (const card of this._cards) {
            card.update();
        }
    }
}
