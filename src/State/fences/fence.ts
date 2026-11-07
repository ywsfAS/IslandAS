import { EventEmitter } from "events";
import type { PathState } from "../path/path";
import type { FenceOptions } from "./types";
import { DEFAULT_FENCE_OPTIONS } from './default';

export class FenceState {

    private _offset: number;
    private _maxCount: number;
    private _sample: number;

    private _positions!: Float32Array;
    private readonly _events: EventEmitter = new EventEmitter();

    private readonly _path: PathState;

    constructor(path: PathState, options: Partial<FenceOptions> = {}) {
        this._path = path;

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
        const cols = this._path.widthSegments + 1;
        const rows = pathPositions.length / (cols * 3);
        const sampledRows = Math.ceil(rows / sample);
        const centers = new Float32Array(sampledRows * 6);
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

            index += 6;
        }
        this._positions = centers;

    }

}