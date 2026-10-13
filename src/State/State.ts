import { CameraState } from "./camera/camera";
import { Controls } from "./controls/controls";
import { PlayerState } from "./player/player";
import { SunState } from "./sun/sun";
import { TerrainsState } from "./terrains/terrains";
import { Time } from "./time";
import { Viewport } from './viewport/viewport';
import { WaterState } from "./water/water";
export class State {
    public static instance: State;

    private readonly _time: Time;
    private readonly _viewport: Viewport;
    private readonly _controls: Controls;
    private readonly _player: PlayerState;
    private readonly _camera: CameraState;
    private readonly _terrains: TerrainsState;
    private readonly _sun: SunState;
    private readonly _water: WaterState;

    public static getInstance(): State {
        return State.instance ?? new State();
    };

    private constructor() {
        State.instance = this;

        this._time = new Time();
        this._viewport = new Viewport();
        this._controls = new Controls();
        this._player = new PlayerState();
        this._terrains = new TerrainsState();

        this._camera = new CameraState();
        this._sun = new SunState();
        this._water = new WaterState();

    }
    get camera() {
        return this._camera;
    }
    get sun() {
        return this._sun;
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
    get Terrains() {
        return this._terrains;
    }
    get water() {
        return this._water;
    }

    public update() {
        this._controls.update();
        this._player.update();
        this._camera.update();
        this._time.update();
        this._sun.update();
        this._water.update(this._time.elapsedTime);
    }

}