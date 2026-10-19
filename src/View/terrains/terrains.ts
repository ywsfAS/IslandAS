import { State } from "../../state/state";
import { TerrainsState } from "../../state/terrains/terrains";
import * as THREE from 'three';
import { View } from "../view";
import { Terrain } from '../terrain/terrain';
import createTerrainMaterial from "../materials/terrainMaterial";
import { EventEmitter } from "events";
import type { PlayerState } from "../../state/player/player";
import { vec3 } from "gl-matrix";
import { DEFAULT_GRASS_CONFIG } from "../grass/default";
import { TupleMap, type ChunksPosition } from "../../state/terrains/types";
import type { TerrainState } from "../../state/terrain/terrain";


export class Terrains {

    private readonly _state: TerrainsState;
    private readonly _scene: THREE.Scene;
    private _material!: THREE.ShaderMaterial;
    private _events = new EventEmitter();

    private readonly _terrains: TupleMap<Terrain> = new TupleMap();

    private readonly _player: PlayerState;


    constructor() {

        const state = State.getInstance();
        const view = View.getInstance();

        this._state = state.Terrains;
        this._scene = view.scene;
        this._player = state.player;


        this.setMaterial();

        this.listen();

        setTimeout(() => {
            this._state.initialize().catch(error => {
                console.error("Failed to initialize terrain chunks", error);
            });
        }, 200);

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
    public getTerrainById(id: ChunksPosition) {
        return this.terrains.get(id);
    }
    private listen() {
        this._state.events.on('create', (terrainState: TerrainState) => {

            const id = terrainState.id;
            const terrain = new Terrain(terrainState);

            this._terrains.set(id, terrain);
            this._events.emit('terrain-view-created', terrain);

            terrainState.events.once('destroy', () => {
                this._terrains.delete(id);
                this._events.emit('terrain-view-destroyed', terrain);
            });
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