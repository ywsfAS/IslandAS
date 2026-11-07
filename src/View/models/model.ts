import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { View } from '../view';
import type { ModelOptions } from './types';
import type { TerrainsState } from '../../state/terrains/terrains';
import { vec2 } from 'gl-matrix';
import { State } from '../../state/state';
import type { TerrainState } from '../../state/terrain/terrain';

export abstract class Model {
    protected readonly _scene: THREE.Scene;
    protected readonly _options: ModelOptions;
    protected _group: THREE.Group;
    protected _animations: THREE.AnimationClip[];

    protected readonly _terrains: TerrainsState;
    protected readonly _introTexture = new THREE.TextureLoader().load("/textures/colormap.png", (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.flipY = false;
    });

    protected constructor(
        defaults: ModelOptions,
        options: Partial<Omit<ModelOptions, 'asset'>> = {},
    ) {
        this._scene = View.getInstance().scene;
        this._options = {
            ...defaults,
            ...options,
            position: options.position?.clone() ?? defaults.position.clone(),
            rotation: options.rotation?.clone() ?? defaults.rotation.clone(),
            scale: options.scale?.clone() ?? defaults.scale.clone(),
        };

        const state = State.getInstance();
        this._terrains = state.Terrains;

        this.load().catch((error: unknown) => {
            console.error(`Failed to load model: ${this._options.asset}`, error);
        });
    }

    private async load(): Promise<void> {
        const gltf = await new GLTFLoader().loadAsync(this._options.asset);
        const model = gltf.scene;
        const anim = gltf.animations;

        const position = vec2.fromValues(this._options.position.x, this._options.position.z);
        const placeOnTerrain = (state: TerrainState) => {
            if (!state.contains(position)) return;

            const height = state.getHeight(position);

            if (height === undefined) return;

            model.position.set(
                this._options.position.x,
                height,
                this._options.position.z
            );
        };

        const handleTerrain = (state: TerrainState) => {
            if (!state.contains(position)) return;

            if (state.isReady) {
                placeOnTerrain(state);
            } else {
                state.events.once('ready', () => placeOnTerrain(state));
            }
        };

        this._terrains.events.on('create', handleTerrain);
        for (const terrain of this._terrains.terrains.values()) {
            handleTerrain(terrain);
        }

        model.rotation.copy(this._options.rotation);
        model.scale.copy(this._options.scale);

        model.traverse(object => {
            if (object instanceof THREE.Mesh) {
                this.setMeshMaterial(object);
                const materials = Array.isArray(object.material)
                    ? object.material
                    : [object.material];
                for (const material of materials) {
                    material.fog = true;
                }
            }
        });


        this._group = model;
        this._animations = anim;

        this.addToScene();
        this.onLoad();
    }
    protected addToScene(): void {
        this._scene.add(this._group);
        this.onLoad();
    }

    protected onLoad() {

    }
    public update() {

    }

    protected setMeshMaterial(mesh: THREE.Mesh): void {
        mesh.material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            fog: false,
            toneMapped: false,
        });
    }
}
