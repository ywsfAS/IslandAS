import { EventEmitter } from 'events';
import { vec2 } from 'gl-matrix';
import { State } from '../state';
import type { TerrainsState } from '../terrains/terrains';
import type { TerrainState } from '../terrain/terrain';
import type { TreesStateOptions } from './types';
import { DEFAULT_TREES_CONFIG } from './default';

export class TreesState {

    private readonly _treesPerChunk: number;
    private readonly _maxCount: number;
    private readonly _minHeight: number;

    private readonly _events = new EventEmitter();
    private readonly _terrains: TerrainsState;

    private readonly _positions: Float32Array;
    private _count = 0;

    private _isReady = false;
    private _destroyed = false;
    private readonly _point = vec2.create();

    constructor(options: Partial<TreesStateOptions> = {}) {
        const d = DEFAULT_TREES_CONFIG;

        this._treesPerChunk = options.treesPerChunk ?? d.treesPerChunk;
        this._maxCount = options.maxCount ?? d.maxCount;
        this._minHeight = options.minHeight ?? d.minHeight;

        this._positions = new Float32Array(this._maxCount * 3);

        this._terrains = State.getInstance().Terrains;
        this._terrains.events.on('create', this.onTerrainCreated);
    }

    get events() { return this._events; }
    get isReady() { return this._isReady; }
    get positions() { return this._positions; }
    get count() { return this._count; }
    get maxCount() { return this._maxCount; }

    public destroy() {
        if (this._destroyed) return;
        this._destroyed = true;
        this._terrains.events.off('create', this.onTerrainCreated);
        this._events.removeAllListeners();
    }

    private onTerrainCreated = (terrain: TerrainState) => {
        if (this._destroyed) return;
        if (terrain.isReady) this.scatter(terrain);
        else terrain.events.once('ready', () => this.scatter(terrain));
    };

    private scatter(terrain: TerrainState) {
        const half = terrain.size / 2;
        let added = 0;

        for (let i = 0; i < this._treesPerChunk && this._count < this._maxCount; i++) {
            const x = terrain.center[0] + (Math.random() * 2 - 1) * half;
            const z = terrain.center[1] + (Math.random() * 2 - 1) * half;
            const y = terrain.getHeight(vec2.set(this._point, x, z));

            if (!Number.isFinite(y) || y < this._minHeight) continue;

            const k = this._count * 3;
            this._positions[k] = x;
            this._positions[k + 1] = y;
            this._positions[k + 2] = z;
            this._count++;
            added++;
        }

        if (added === 0) return;

        this._isReady = true;
        this._events.emit('ready');
    }
}