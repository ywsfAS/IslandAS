import * as THREE from 'three';
import type { TerrainState } from '../../state/terrain/terrain';
import { View } from '../view';
import { State } from '../../state/state';
import { TerrainsState } from '../../state/terrains/terrains';
import { Terrains } from '../terrains/terrains';



export class Terrain {

    private readonly _scene: THREE.Scene;
    private _state!: TerrainState;
    private _terrainsState: TerrainsState;

    private _terrains: Terrains;

    private _geometry!: THREE.BufferGeometry;
    private _material!: THREE.ShaderMaterial;

    constructor(terrainState: TerrainState) {

        const view = View.getInstance();
        const state = State.getInstance();

        this._scene = view.scene;
        this._terrainsState = state.Terrains;
        this._state = terrainState;
        this._terrains = view.terrains;


        console.log("this", this._terrains);
        // on terrain state creation
        this.listen();

    }
    private listen() {
        this._state.events.on('ready', () => this.create());
    }
    public state() {
        return this._state;
    }
    get normals() {
        return this._geometry.getAttribute('normal');
    }

    public getHeightTexture() {

        const heightTexture = new THREE.DataTexture(
            this._state.textures,
            this._state.resolution,
            this._state.resolution,
            THREE.RedFormat,
            THREE.FloatType
        );
        heightTexture.magFilter = THREE.LinearFilter;
        heightTexture.minFilter = THREE.LinearFilter;

        heightTexture.wrapS = THREE.ClampToEdgeWrapping;
        heightTexture.wrapT = THREE.ClampToEdgeWrapping;

        heightTexture.needsUpdate = true;


        return heightTexture;

    }
    private create() {

        this._geometry = new THREE.BufferGeometry();
        this._geometry.setAttribute('position', new THREE.BufferAttribute(this._state.position, 3));
        this._geometry.setIndex(new THREE.BufferAttribute(this._state.indices, 1, false));
        this._geometry.computeVertexNormals();

        console.log("normal", this._geometry.getAttribute('normal'));
        this._material = this._terrains.material;

        this._material.uniforms.uHeightMap.value = this.getHeightTexture();

        const mesh = new THREE.Mesh(this._geometry, this._material);
        this._scene.add(mesh);

    }


}