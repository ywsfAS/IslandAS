import { Controls } from "./controls/controls";
import { Time } from "./time";
import { Viewport } from './viewport/viewport';
export class State {
    public static instance: State;

    private readonly _time: Time;
    private readonly _viewport: Viewport;
    private readonly _controls: Controls;

    public static getInstance(): State {
        return State.instance ?? new State();
    };

    private constructor() {
        State.instance = this;

        this._time = new Time();
        this._viewport = new Viewport();
        this._controls = new Controls();

    }

    get time() {
        return this._time;
    }
    get viewport() {
        return this._viewport;
    }
    get controls() {
        return this._controls;
    }

    public update() {
        this._controls.update();
        this._time.Update();
    }

}