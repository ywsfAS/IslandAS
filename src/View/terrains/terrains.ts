import { State } from "../../state/state";
import { TerrainsState } from "../../state/terrains/terrains";
import * as THREE from 'three';
import { View } from "../view";
import { Terrain } from '../terrain/terrain';
import createTerrainMaterial from "../materials/terrainMaterial";
import { EventEmitter } from "events";


export class Terrains {

    private readonly _state: TerrainsState;
    private readonly _scene: THREE.Scene;
    private _material!: THREE.ShaderMaterial;
    private _events = new EventEmitter();

    private _id = 0;
    private readonly _terrains: Map<number, Terrain> = new Map();

    constructor() {

        const state = State.getInstance();
        const view = View.getInstance();

        this._state = state.Terrains;
        this._scene = view.scene;

        this.setMaterial();

        this.listen();

        setTimeout(() => this._state.initialize(), 1000);

    }
    get material() {
        return this._material;
    }
    get terrains() {
        return this._terrains;
    }
    get events() {
        return this._events;
    }
    public getTerrainById(id: number) {
        return this.terrains.get(id);
    }
    private listen() {
        this._state.events.on('create', (terrainState) => {
            this._id++;
            console.log("added a terrain to view");
            const terrain = new Terrain(terrainState);

            this._events.emit('terrain-view-created', terrain);

            this._terrains.set(this._id, terrain);
        })
    }
    private setMaterial() {
        const material = createTerrainMaterial();
        material.uniforms.uTime.value = 1;


        this._material = material;

    }

}