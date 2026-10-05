import { View } from './view/view';
import { State } from './state/state';


export class Game {

    private readonly _view: View;
    private readonly _state: State;
    constructor() {

        this._view = View.getInstance();
        this._state = State.getInstance();


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
        this._state.update();
        this._view.update();
        requestAnimationFrame(this.update);
    }

    private resize() {
        console.log('resizing...')
        this._view.resize();
    }

}