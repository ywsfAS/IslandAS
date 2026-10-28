
import { EventEmitter } from 'events';
import { vec2, vec3 } from 'gl-matrix';

import { State } from '../state';
import type { TerrainsState } from '../terrains/terrains';
import type { TerrainState } from '../terrain/terrain';

import type { BushOptions, BushPlacement } from './types';
import { DEFAULT_BUSH_OPTIONS } from './default';

export class BushesState {
    private readonly _events = new EventEmitter();
    private readonly _terrains: TerrainsState;
    private readonly _options: BushOptions;

    private readonly _placements: BushPlacement[] = [];
    private readonly _point = vec2.create();

    private _destroyed = false;

    constructor(options: Partial<BushOptions> = {}) {
        this._options = {
            ...DEFAULT_BUSH_OPTIONS,
            ...options,
        };

        this._terrains = State.getInstance().Terrains;

        this._terrains.events.on(
            'create',
            this.onTerrainCreated,
        );
    }

    get events() {
        return this._events;
    }

    get isReady() {
        return this._placements.length > 0;
    }

    get placements() {
        return this._placements;
    }

    destroy() {
        if (this._destroyed) return;

        this._destroyed = true;

        this._terrains.events.off(
            'create',
            this.onTerrainCreated,
        );

        this._events.removeAllListeners();
        this._placements.length = 0;
    }

    private onTerrainCreated = (terrain: TerrainState) => {
        if (this._destroyed) return;

        if (terrain.isReady) {
            this.scatter(terrain);
        } else {
            terrain.events.once('ready', () => {
                this.scatter(terrain);
            });
        }
    };

    private scatter(terrain: TerrainState) {
        if (this._destroyed) return;

        const half = terrain.size / 2;
        let added = 0;
        const maxAttempts = this._options.count * 20;

        for (
            let attempt = 0;
            attempt < maxAttempts &&
            added < this._options.count;
            attempt++
        ) {
            const x =
                terrain.center[0] +
                (Math.random() * 2 - 1) * half;

            const z =
                terrain.center[1] +
                (Math.random() * 2 - 1) * half;

            const y = terrain.getHeight(
                vec2.set(this._point, x, z),
            );

            if (!Number.isFinite(y)) continue;

            const tooClose = this._placements.some((bush) => {
                const dx = bush.position[0] - x;
                const dz = bush.position[2] - z;

                return (
                    dx * dx + dz * dz <
                    this._options.minDistance ** 2
                );
            });

            if (tooClose) continue;

            this._placements.push({
                position: vec3.fromValues(x, y, z),
                scale:
                    this._options.minScale +
                    Math.random() *
                    (this._options.maxScale -
                        this._options.minScale),
                rotation: Math.random() * Math.PI * 2,
            });

            added++;
        }

        if (added > 0) {
            this._events.emit('ready');
        }
    }
}
