import { View } from './view/view';
import { State } from './state/state';
import Stats from 'stats.js';

export class Game {

    private readonly _view: View;
    private readonly _state: State;

    private readonly _stats: Stats;

    constructor() {

        this._view = View.getInstance();
        this._state = State.getInstance();

        this._stats = new Stats();
        this._stats.showPanel(0);
        document.body.appendChild(this._stats.dom);


        this.update = this.update.bind(this);
        this.resize = this.resize.bind(this);

        window.addEventListener('resize', this.resize);
    }

    get view() {
        return this._view;
    }
    get state() {
        return this._state;
    }

    public run(): void {
        console.log("game is starting ...");
        this.update();
    }
    private update(): void {
        this._stats.begin();
        this._state.update();
        this._view.update();
        this._stats.end();
        requestAnimationFrame(this.update);
    }

    private resize() {
        console.log('resizing...')
        this._view.resize();
    }

}