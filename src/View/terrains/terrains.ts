import { State } from "../../state/state";
import { TerrainsState } from "../../state/terrains/terrains";
import * as THREE from 'three';
import { View } from "../view";
import { Terrain } from '../terrain/terrain';
import createTerrainMaterial from "../materials/terrainMaterial";


export class Terrains {

    private readonly _state: TerrainsState;
    private readonly _scene: THREE.Scene;
    private _material!: THREE.ShaderMaterial;

    private readonly _terrains: Set<Terrain> = new Set();

    constructor() {

        const state = State.getInstance();
        const view = View.getInstance();

        this._state = state.Terrains;
        this._scene = view.scene;

        this.setMaterial();

        console.log("we listen and we dont judge");
        this.listen();

        setTimeout(() => this._state.initialize(), 1000);

    }
    get material() {
        return this._material;
    }
    private listen() {
        this._state.events.on('create', (terrainState) => {
            console.log("added a terrain to view");
            const terrain = new Terrain(terrainState);
            this._terrains.add(terrain);
        })
    }
    private setMaterial() {
        const material = createTerrainMaterial();
        material.uniforms.uTime.value = 1;


        this._material = material;

    }

}