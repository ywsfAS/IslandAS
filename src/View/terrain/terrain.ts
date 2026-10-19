import * as THREE from 'three';
import type { TerrainState } from '../../state/terrain/terrain';
import { View } from '../view';
import { State } from '../../state/state';
import { TerrainsState } from '../../state/terrains/terrains';
import { Terrains } from '../terrains/terrains';
import type { Sun } from '../sun/sun';



export class Terrain {

    private readonly _scene: THREE.Scene;
    private _state!: TerrainState;
    private _terrainsState: TerrainsState;

    private _terrains: Terrains;

    private _geometry!: THREE.BufferGeometry;
    private _material!: THREE.ShaderMaterial;
    private _mesh?: THREE.Mesh;
    private _heightTexture?: THREE.DataTexture;
    private _disposed = false;

    private readonly _sun: Sun;

    constructor(terrainState: TerrainState) {

        const view = View.getInstance();
        const state = State.getInstance();

        this._scene = view.scene;
        this._terrainsState = state.Terrains;
        this._state = terrainState;
        this._terrains = view.terrains;
        this._sun = view.sun;

        // on terrain state creation
        this.listen();

    }
    private listen() {
        this._state.events.once('destroy', () => this.dispose());
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
        if (this._disposed) {
            return;
        }

        this._geometry = new THREE.BufferGeometry();
        this._geometry.setAttribute('position', new THREE.BufferAttribute(this._state.position, 3));
        this._geometry.setIndex(new THREE.BufferAttribute(this._state.indices, 1, false));
        this._geometry.computeVertexNormals();

        this._material = this._terrains.material;

        this._heightTexture = this.getHeightTexture();
        this._material.uniforms.uHeightMap.value = this._heightTexture;
        this._material.uniforms.uDirectionLight.value = this._sun.lightDirection;
        this._material.uniforms.uSunIntensity.value = this._sun.intensity;
        this._material.uniforms.uSunColor.value = this._sun.color;

        this._mesh = new THREE.Mesh(this._geometry, this._material);
        this._scene.add(this._mesh);
    }
    private dispose() {
        this._disposed = true;
        if (this._mesh) {
            this._scene.remove(this._mesh);
        }
        this._geometry?.dispose();
        this._heightTexture?.dispose();

    }


}