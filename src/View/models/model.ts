import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { View } from '../view';
import type { ModelOptions } from './types';

export abstract class Model {
    protected readonly _scene: THREE.Scene;
    protected readonly _options: ModelOptions;

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

        this.load().catch((error: unknown) => {
            console.error(`Failed to load model: ${this._options.asset}`, error);
        });
    }

    private async load(): Promise<void> {
        const gltf = await new GLTFLoader().loadAsync(this._options.asset);
        const model = gltf.scene;

        model.position.copy(this._options.position);
        model.rotation.copy(this._options.rotation);
        model.scale.copy(this._options.scale);

        model.traverse(object => {
            if (object instanceof THREE.Mesh) {
                this.setMeshMaterial(object);
            }
        });

        this._scene.add(model);
    }

    protected setMeshMaterial(mesh: THREE.Mesh): void {
        mesh.material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            fog: false,
            toneMapped: false,
        });
    }
}
