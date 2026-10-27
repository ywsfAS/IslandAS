import { EventEmitter } from "events";
import type { PathState } from "../path/path";
import { State } from "../state";
import type { FenceOptions } from "./types";
import { DEFAULT_FENCE_OPTIONS } from './default';

export class FenceState {

    private _offset: number;
    private _maxCount: number;

    private _positions!: Float32Array;
    private readonly _events: EventEmitter = new EventEmitter();

    private readonly _path: PathState;

    constructor(options: Partial<FenceOptions> = {}) {

        const state = State.getInstance();
        this._path = state.path;

        const { offset, maxCount } = DEFAULT_FENCE_OPTIONS;

        this._offset = options.offset ?? offset;
        this._maxCount = options.maxCount ?? maxCount;

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

        const rows = pathPositions.length / 3;
        const cols = this._path.widthSegments + 1;
        const centers = new Float32Array(rows * 3 * 2);
        for (let i = 0; i < rows; i++) {

            const rowStart = i * cols * 3;
            const left = rowStart;
            const right = rowStart + (cols - 1) * 3;
            const index = i * 6;

            // left side 
            centers[index] = pathPositions[left] + this._offset;
            centers[index + 1] = pathPositions[left + 1];
            centers[index + 2] = pathPositions[left + 2];

            // right side
            centers[index + 3] = pathPositions[right] - this._offset;
            centers[index + 4] = pathPositions[right + 1];
            centers[index + 5] = pathPositions[right + 2];
        }
        this._positions = centers;
        console.log(centers);

    }

}