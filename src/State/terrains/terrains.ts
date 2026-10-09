import { IterationMode, type TerrainsOptions } from "./types";
import { DEFAULT_TERRAINS_CONFIGS } from './default';
import { TerrainState } from '../terrain/terrain'
import { vec2 } from "gl-matrix";
import { EventEmitter } from "events";
import TerrainWorker from '../../workers/terrainWorker?worker';

export class TerrainsState {

    private _subdivisions: number;
    private _lacunarity: number;
    private _persistence: number;
    private _baseEmplitude: number;
    private _power: number;
    private _frequency: number;

    private readonly _iterationMode: IterationMode = IterationMode.MAX_INTERATION_MODE;

    private readonly _maxIteration: number;
    private readonly _iterationsOffsets: number[][] = [];

    // holds map of terrain refs (id,terrian)
    private _terrains: Map<number, TerrainState> = new Map();
    private _id: number = 0;
    private _events: EventEmitter = new EventEmitter();

    private _worker = new TerrainWorker();

    constructor(options: Partial<TerrainsOptions> = {}) {

        const { maxIteration, subdivisions, lacunarity, persistence, baseEmplitude, power, frequency } = DEFAULT_TERRAINS_CONFIGS;

        this._subdivisions = options.subdivisions ?? subdivisions;
        this._lacunarity = options.lacunarity ?? lacunarity;
        this._persistence = options.persistence ?? persistence;
        this._baseEmplitude = options.baseEmplitude ?? baseEmplitude;
        this._power = options.power ?? power;
        this._frequency = options.frequency ?? frequency;

        this._maxIteration = options.maxIteration ?? maxIteration;


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

    get events() {
        return this._events;
    }
    public initialize() {
        this.create(this._subdivisions, vec2.fromValues(0, 0), 1);
    }

    public setWorker() {

        this._worker.onmessage = (event) => {

            const terrain = this._terrains.get(event.data.id);

            if (terrain) {
                terrain.fill(event.data);
                const height = terrain.getHeight(vec2.fromValues(0, 0));
                console.log("height is expected : 0 got : ", height);
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
    public create(size: number, center: vec2, precision: number) {

        this._id++;

        const iter = this.getIterations(precision);
        const terrain = new TerrainState({ id: this._id, size: size, center: center, precision: precision, terrains: this });
        this._terrains.set(this._id, terrain);

        this._worker.postMessage({

            id: this._id,
            size: size,
            center: center,
            subdivisions: this._subdivisions,
            precision: precision,

            lacunarity: this._lacunarity,
            iterations: iter,
            persistence: this._persistence,
            baseEmplitude: this._baseEmplitude,
            frequency: this._frequency,
            power: this._power,
            terrainOffsets: this._iterationsOffsets

        })


        console.log("emit create");

        // publish terrian event creation
        this._events.emit('create', terrain);

        return terrain;

    }
    public destroyTerrain(id: number) {
        // fire event destroy
        this._terrains.get(id)?.events.emit('destroy');
    }



}