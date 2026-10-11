import { State } from "../../state/state";
import { TerrainsState } from "../../state/terrains/terrains";
import * as THREE from 'three';
import { View } from "../view";
import { Terrain } from '../terrain/terrain';
import createTerrainMaterial from "../materials/terrainMaterial";
import { EventEmitter } from "events";
import type { Player } from "../../state/player/player";
import { vec3 } from "gl-matrix";
import { Grass } from "../grass/grass";
import { DEFAULT_GRASS_CONFIG } from "../grass/default";


export class Terrains {

    private readonly _state: TerrainsState;
    private readonly _scene: THREE.Scene;
    private _material!: THREE.ShaderMaterial;
    private _events = new EventEmitter();

    private _id = 0;
    private readonly _terrains: Map<number, Terrain> = new Map();

    private readonly _player: Player;


    constructor() {

        const state = State.getInstance();
        const view = View.getInstance();

        this._state = state.Terrains;
        this._scene = view.scene;
        this._player = state.player;


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
        const { chunkSize } = DEFAULT_GRASS_CONFIG;
        const material = createTerrainMaterial();
        material.uniforms.uPlayerPosition.value = vec3.fromValues(0, 0, 0);
        material.uniforms.uGrassDistance.value = chunkSize;
        material.uniforms.uTime.value = 1;
        this._material = material;

    }
    public update() {
        const position = this._player.position.cur;
        this._material.uniforms.uPlayerPosition.value = vec3.fromValues(position.x, position.y, position.z);
    }

}