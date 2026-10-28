import { EventEmitter } from "events";
import type { PathState } from "../path/path";
import { State } from "../state";
import type { FenceOptions } from "./types";
import { DEFAULT_FENCE_OPTIONS } from './default';
import { smaa } from "three/examples/jsm/tsl/display/SMAANode.js";

export class FenceState {

    private _offset: number;
    private _maxCount: number;
    private _sample: number;

    private _positions!: Float32Array;
    private readonly _events: EventEmitter = new EventEmitter();

    private readonly _path: PathState;

    constructor(options: Partial<FenceOptions> = {}) {

        const state = State.getInstance();
        this._path = state.path;

        const { offset, maxCount, sample } = DEFAULT_FENCE_OPTIONS;

        this._offset = options.offset ?? offset;
        this._maxCount = options.maxCount ?? maxCount;
        this._sample = options.sample ?? sample;

        this._path.events.on('ready', () => this.build());

    }
    get events() {
        return this._events;
    }
    get positions() {
        return this._positions;
    }

    public build(): void {
        this.setGeometry();
        this._events.emit('ready');

    }
    public setGeometry() {
        const pathPositions = this._path.positions;

        const sample = this._sample;
        const rows = pathPositions.length / 3;
        const cols = this._path.widthSegments + 1;
        const centers = new Float32Array(Math.ceil(rows / sample) * 3 * 2);
        let index = 0;
        for (let i = 0; i < rows; i += sample) {

            const rowStart = i * cols * 3;
            const left = rowStart;
            const right = rowStart + (cols - 1) * 3;

            // left side 
            centers[index] = pathPositions[left] + this._offset;
            centers[index + 1] = pathPositions[left + 1];
            centers[index + 2] = pathPositions[left + 2];

            // right side
            centers[index + 3] = pathPositions[right] - this._offset;
            centers[index + 4] = pathPositions[right + 1];
            centers[index + 5] = pathPositions[right + 2];

            index += sample;
        }
        this._positions = centers;
        console.log(centers);

    }

}