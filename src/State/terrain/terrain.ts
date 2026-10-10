import { EventEmitter } from "events";
import { vec2 } from "gl-matrix";
import { TerrainsState } from "../terrains/terrains";
import { ReadbackBuffer } from "three/webgpu";

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
    private _positions: Float32Array = new Float32Array();
    private _indices = new Uint32Array();
    private _uv: any;
    private _textures: any;



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
    get indices() {
        return this._indices;
    }

    // fill the terrain chunk with data assigned to it from terrains
    public fill(data: any) {

        this._positions = data.positions;
        this._indices = data.indices;
        this._normals = data.normals;
        this._uv = data.uv;
        this._textures = data.textures;

        this._isReady = true;


        // fire the ready event
        this._events.emit('ready');


    }

    // get the height of a specific point in the map (x,z)

    public getHeight(point: vec2): number | void {

        if (!this._isReady) {
            return;
        }

        // get realtive centered (x,z)
        const halfSize = this._size * 0.5;

        const subdivisions = this._terrains.subdivisions;
        const segments = subdivisions + 1;
        const segmentSize = segments / this._size;

        const relativeX = point[0] - this._center[0] + halfSize;
        const relativeZ = point[1] - this._center[1] + halfSize;

        // referx to index of points or cell
        const XIndexA = Math.floor(relativeX / segmentSize);
        const ZIndexA = Math.floor(relativeZ / segmentSize);

        const XIndexC = XIndexA + 1;
        const ZIndexC = XIndexA + 1;

        const ratioX = (relativeX / segmentSize) % 1;
        const ratioZ = (relativeZ / segmentSize) % 1;

        const XIndexB = ratioX < ratioZ ? XIndexA : XIndexA + 1;
        const ZIndexB = ratioX > ratioZ ? ZIndexA + 1 : ZIndexA;

        const indexPosA = (ZIndexA * segments + XIndexA) * 3;
        const indexPosB = (ZIndexB * segments + XIndexB) * 3;
        const indexPosC = (ZIndexC * segments + XIndexC) * 3;

        const aPositionZVal = this._positions[indexPosA + 1];
        const bPositionZVal = this._positions[indexPosB + 1];
        const cPositionZVal = this._positions[indexPosC + 1];


        const w1 = 1 - ratioX;
        const w2 = ratioX - ratioZ;
        const w3 = ratioZ

        const finalZ = w1 * aPositionZVal + w2 * bPositionZVal + w3 * cPositionZVal;

        return finalZ;

    }


}