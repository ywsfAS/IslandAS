import { IterationMode, type TerrainsOptions } from "./types";
import { DEFAULT_TERRAINS_CONFIGS } from './default';
import { Terrain } from '../terrain/terrain'

export class Terrains {

    private _subdivisions: number;
    private _lacunarity: number;
    private _persistence: number;

    private readonly _iterationMode: IterationMode = IterationMode.MAX_INTERATION_MODE;

    private readonly _maxIteration: number;
    private readonly _minIteration: number;

    // holds map of terrain refs (id,terrian)
    private _terrains: Map<number, Terrain> = new Map();

    constructor(options: Partial<TerrainsOptions> = {}) {

        const { maxIteration, minIteration, subdivisions, lacunarity, persistence } = DEFAULT_TERRAINS_CONFIGS;

        this._subdivisions = options.subdivisions ?? subdivisions;
        this._lacunarity = options.lacunarity ?? lacunarity;
        this._persistence = options.persistence ?? persistence;

        this._maxIteration = options.maxIteration ?? maxIteration;
        this._minIteration = options.minIteration ?? minIteration;


    }
    get subdivisions() {
        return this._subdivisions;
    }
    public getIterations(): number {

        if (this._iterationMode == IterationMode.MAX_INTERATION_MODE) {
            return this._maxIteration;
        } else {
            return this._minIteration;
        }

    }
    public destroyTerrain(id: number) {
        // fire event destroy
        this._terrains.get(id)?.events.emit('destroy');
    }



}