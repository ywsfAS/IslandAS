import { Time } from "./time";
import { Viewport } from './viewport/viewport';
export class State {
    public static instance: State;

    private _time: Time;
    private _viewport: Viewport;

    public static getInstance(): State {
        return State.instance ?? new State();
    };

    private constructor() {
        State.instance = this;

        this._time = new Time();
        this._viewport = new Viewport();

    }

    get time() {
        return this._time;
    }
    get viewport() {
        return this._viewport;
    }










}