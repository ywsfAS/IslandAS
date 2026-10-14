import { EventEmitter } from "events";
import { vec2 } from "gl-matrix";
import { TerrainsState } from "../terrains/terrains";
import { getTerrainHeight } from "../utility";

export interface TerrainOptions {

    id: number;
    size: number;
    center: vec2;
    precision: number;

    terrains: TerrainsState;
}



export class TerrainState {
    private _id: number;
    private _size: number;
    private _center: vec2;
    private _precision: number;
    private _events: EventEmitter = new EventEmitter();
    private _terrains: TerrainsState;


    private _normals: any;
    private _positions!: Float32Array;
    private _indices!: Uint32Array;
    private _uv: any;
    private _textures!: Float32Array;

    private _resolution!: number;



    private _isReady: boolean = false;

    constructor(options: TerrainOptions) {

        this._id = options.id;
        this._size = options.size;
        this._center = vec2.fromValues(options.center[0], options.center[1]);

        this._precision = options.precision;
        this._terrains = options.terrains;

    }
    get events() {
        return this._events;
    }
    get position() {
        return this._positions;
    }
    get textures() {
        return this._textures;
    }
    get indices() {
        return this._indices;
    }
    get resolution() {
        return this._resolution;
    }
    get size() {
        return this._size;
    }
    get center() {
        return this._center;
    }
    public contains(point: vec2): boolean {
        const halfSize = this._size * 0.5;
        return point[0] >= this._center[0] - halfSize
            && point[0] <= this._center[0] + halfSize
            && point[1] >= this._center[1] - halfSize
            && point[1] <= this._center[1] + halfSize;
    }
    public get isReady(): boolean {
        return this._isReady;
    }

    // fill the terrain chunk with data assigned to it from terrains
    public fill(data: any) {

        this._positions = data.positions;
        this._indices = data.indices;
        this._normals = data.normals;
        this._uv = data.uv;
        this._textures = data.textures;
        this._resolution = data.resolution;

        this._isReady = true;

        console.log("terrain position", this._positions);
        console.log("terrain textures", this._textures);


        // fire the ready event
        this._events.emit('ready');


    }

    // get the height of a specific point in the map (x,z)

    public getHeight(point: vec2): number {

        if (!this._isReady) {
            return 0;
        }
        return getTerrainHeight(point, {
            size: this._size,
            subdivisions: this._terrains.subdivisions,
            center: this._center,
            positions: this._positions
        })

    }


}