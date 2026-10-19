import { IterationMode, TupleMap, type ChunksPosition, type TerrainEvent, type TerrainResult, type TerrainsOptions } from "./types";
import { DEFAULT_TERRAINS_CONFIGS } from './default';
import { TerrainState } from '../terrain/terrain'
import { EventEmitter } from "events";
import TerrainWorker from '../../workers/terrainWorker?worker';
import { vec2 } from 'gl-matrix';
import type { PlayerState } from "../player/player";
import { State } from "../state";

interface TerrainJob {
    terrain: TerrainState;
    data: TerrainEvent;
    resolve: (terrain: TerrainState) => void;
    reject: (reason: Error) => void;
}

interface TerrainWorkerSlot {
    worker: Worker;
    job?: TerrainJob;
}

export class TerrainsState {

    private _subdivisions: number;
    private _lacunarity: number;
    private _persistence: number;
    private _baseEmplitude: number;
    private _power: number;
    private _frequency: number;
    private _verticalOffset: number;

    private readonly _iterationMode: IterationMode = IterationMode.MAX_INTERATION_MODE;

    private readonly _maxIteration: number;
    private readonly _iterationsOffsets: number[][] = [];

    // holds map of terrain refs (id,terrian)
    private _terrains: TupleMap<TerrainState> = new TupleMap();
    // default start is the center around the player
    private _events: EventEmitter = new EventEmitter();

    private _workers: TerrainWorkerSlot[] = [];
    private _workerQueue: TerrainJob[] = [];

    private _player: PlayerState;
    private readonly _size = 200;
    private readonly _radius = 500;
    private _initialized = false;

    constructor(options: Partial<TerrainsOptions> = {}) {

        const state = State.getInstance();
        this._player = state.player;

        const { maxIteration, subdivisions, lacunarity, persistence, baseEmplitude, power, frequency, verticalOffset } = DEFAULT_TERRAINS_CONFIGS;

        this._subdivisions = options.subdivisions ?? subdivisions;
        this._lacunarity = options.lacunarity ?? lacunarity;
        this._persistence = options.persistence ?? persistence;
        this._baseEmplitude = options.baseEmplitude ?? baseEmplitude;
        this._power = options.power ?? power;
        this._frequency = options.frequency ?? frequency;

        this._maxIteration = options.maxIteration ?? maxIteration;
        this._verticalOffset = options.verticalOffset ?? verticalOffset;


        // generates random offset for terrains
        for (let i = 0; i < this._maxIteration; i++)
            this._iterationsOffsets.push([(Math.random() - 0.5) * 200000, (Math.random() - 0.5) * 200000])


        this.setWorker();


    }

    get subdivisions() {
        return this._subdivisions;
    }

    get terrains() {
        return this._terrains;
    }

    public getHeightAt(point: vec2): number | undefined {
        for (const terrain of this._terrains.values()) {
            if (terrain.contains(point) && terrain.isReady) {
                return terrain.getHeight(point);
            }
        }
        return undefined;
    }

    get events() {
        return this._events;
    }
    public async initialize(): Promise<void> {
        const playerPosition = this._player.position.cur;
        const positions = this.getPositionsWithinRadius(playerPosition.x, playerPosition.z);
        const promises = positions.map(position =>
            this.create(this._size, position, vec2.create(), 1)
        );
        await Promise.all(promises);
        this._initialized = true;
    }
    public setWorker() {
        const workerCount = Math.min(4, Math.max(1, navigator.hardwareConcurrency || 2));

        for (let i = 0; i < workerCount; i++) {
            const slot: TerrainWorkerSlot = { worker: new TerrainWorker() };
            slot.worker.onmessage = (event: MessageEvent<TerrainResult>) => {
                const job = slot.job;
                if (!job) {
                    console.error("Terrain worker returned data without an active job");
                    return;
                }

                try {
                    if (this._terrains.get(job.terrain.id) === job.terrain) {
                        job.terrain.fill(event.data);
                    }
                    job.resolve(job.terrain);
                } catch (error) {
                    job.reject(error instanceof Error ? error : new Error(String(error)));
                } finally {
                    slot.job = undefined;
                    this.dispatchJobs();
                }
            };
            slot.worker.onerror = (event: ErrorEvent) => {
                const job = slot.job;
                slot.job = undefined;
                job?.reject(new Error(event.message || "Terrain worker failed"));
                this.dispatchJobs();
            };
            slot.worker.onmessageerror = () => {
                const job = slot.job;
                slot.job = undefined;
                job?.reject(new Error("Unable to read terrain worker response"));
                this.dispatchJobs();
            };
            this._workers.push(slot);
        }
    }
    private dispatchJobs() {
        for (const slot of this._workers) {
            if (slot.job) {
                continue;
            }

            while (!slot.job) {
                const job = this._workerQueue.shift();
                if (!job) {
                    break;
                }

                slot.job = job;
                try {
                    slot.worker.postMessage(job.data);
                } catch (error) {
                    slot.job = undefined;
                    job.reject(error instanceof Error ? error : new Error(String(error)));
                }
            }
        }
    }
    public getIterations(precision: number): number {

        if (this._iterationMode == IterationMode.MAX_INTERATION_MODE) {
            return this._maxIteration;
        } else {
            return (this._maxIteration - 1) * precision + 1;
        }

    }
    private ChunkPositionMulScalar(chunk: ChunksPosition, scalar: number) {
        return [chunk[0] * scalar, chunk[1] * scalar];
    }
    public create(size: number, chunkPosition: ChunksPosition, center: vec2, precision: number): Promise<TerrainState> {

        const chunkPositionMulSize = this.ChunkPositionMulScalar(chunkPosition, size);
        const centerOfChunk = vec2.fromValues(chunkPositionMulSize[0] + center[0], chunkPositionMulSize[1] + center[1]);
        const iter = this.getIterations(precision);
        const terrain = new TerrainState({ id: chunkPosition, size: size, center: centerOfChunk, precision: precision, terrains: this });
        this._terrains.set(chunkPosition, terrain);

        const terrainData: TerrainEvent = {

            id: chunkPosition,
            size: size,
            center: centerOfChunk,
            subdivisions: this._subdivisions,
            precision: precision,

            lacunarity: this._lacunarity,
            iterations: iter,
            persistence: this._persistence,
            baseEmplitude: this._baseEmplitude,
            frequency: this._frequency,
            power: this._power,
            terrainOffsets: this._iterationsOffsets,

            verticalOffset: this._verticalOffset,

        };

        // publish terrian event creation
        this._events.emit('create', terrain);

        return new Promise<TerrainState>((resolve, reject) => {
            this._workerQueue.push({ terrain, data: terrainData, resolve, reject });
            this.dispatchJobs();
        });

    }
    public destroyTerrain(id: ChunksPosition) {
        const terrain = this._terrains.get(id);
        if (!terrain) {
            return;
        }

        terrain.events.emit('destroy', id);
        this._terrains.delete(id);
    }
    private getPositionsWithinRadius(x: number, z: number): ChunksPosition[] {
        const minX = Math.ceil((x - this._radius) / this._size);
        const maxX = Math.floor((x + this._radius) / this._size);
        const minZ = Math.ceil((z - this._radius) / this._size);
        const maxZ = Math.floor((z + this._radius) / this._size);
        const positions: ChunksPosition[] = [];
        const radiusSquared = this._radius * this._radius;

        for (let chunkX = minX; chunkX <= maxX; chunkX++) {
            for (let chunkZ = minZ; chunkZ <= maxZ; chunkZ++) {
                const centerX = chunkX * this._size;
                const centerZ = chunkZ * this._size;
                const distanceX = centerX - x;
                const distanceZ = centerZ - z;

                if (distanceX * distanceX + distanceZ * distanceZ <= radiusSquared) {
                    positions.push([chunkX, chunkZ]);
                }
            }
        }

        return positions;
    }
    public update() {
        if (!this._initialized) {
            return;
        }

        const x = this._player.position.cur.x;
        const z = this._player.position.cur.z;
        const desiredPositions = this.getPositionsWithinRadius(x, z);
        const desiredKeys = new Set(desiredPositions.map(([positionX, positionZ]) =>
            `${positionX},${positionZ}`
        ));

        for (const terrain of Array.from(this._terrains.values())) {
            const [terrainX, terrainZ] = terrain.id;
            if (!desiredKeys.has(`${terrainX},${terrainZ}`)) {
                this.destroyTerrain(terrain.id);
            }
        }

        for (const position of desiredPositions) {
            if (!this._terrains.has(position)) {
                this.create(this._size, position, vec2.create(), 1).catch(error => {
                    console.error(`Failed to create terrain chunk ${position}`, error);
                });
            }
        }

    }



}