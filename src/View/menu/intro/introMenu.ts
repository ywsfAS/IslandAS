import { Menu } from '../menu';
import type { MenuOptions } from '../types';

export class IntroMenu extends Menu {
    private readonly _cbs: (() => void)[];

    public constructor(options: Partial<MenuOptions> = {}, ...fn: (() => void)[]) {
        super(options);

        this._cbs = fn;
    }

    protected override createContent(options: MenuOptions): HTMLElement {
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

        const title = document.createElement('h2');
        title.textContent = options.contentTitle ?? options.iconTitle;
        Object.assign(title.style, {
            margin: '0',
            fontSize: '16px',
            fontWeight: '600',
        });

        header.append(title);

        const message = document.createElement('p');
        message.textContent = options.contentMessage ?? '';
        Object.assign(message.style, {
            margin: '8px 0 0',
            color: '#60717d',
            fontSize: '12px',
            lineHeight: '1.5',
        });

        panel.append(header, message);
        if (options.content) {
            console.log("here");
            panel.append(options.content);
        };
        return panel;
    }
    public override onIconClick = () => {
        for (let fn of this._cbs) {
            fn();
        }
    }

}
