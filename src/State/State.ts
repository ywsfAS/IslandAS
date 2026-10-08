import { CameraState } from "./camera/camera";
import { Controls } from "./controls/controls";
import { Player } from "./player/player";
import { Time } from "./time";
import { Viewport } from './viewport/viewport';
export class State {
    public static instance: State;

    private readonly _time: Time;
    private readonly _viewport: Viewport;
    private readonly _controls: Controls;
    private readonly _player: Player;
    private readonly _camera: CameraState;

    public static getInstance(): State {
        return State.instance ?? new State();
    };

    private constructor() {
        State.instance = this;

        this._time = new Time();
        this._viewport = new Viewport();
        this._controls = new Controls();
        this._player = new Player();

        this._camera = new CameraState();

    }
    get camera() {
        return this._camera;
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
    get player() {
        return this._player;
    }

    public update() {
        this._controls.update();
        this._player.update();
        this._camera.update();
        this._time.Update();
    }

}