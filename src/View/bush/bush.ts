
import * as THREE from 'three';

import type { BushViewOptions } from './types';
import { DEFAULT_BUSH_VIEW_OPTIONS } from './default';
import type { BushesState } from '../../state/bush/bush';
import { State } from '../../state/state';
import { View } from '../view';

export class Bushe {
    private readonly _state: BushesState;
    private readonly _options: BushViewOptions;

    private readonly _group = new THREE.Group();
    private readonly _geometry: THREE.BufferGeometry;
    private readonly _material: THREE.MeshStandardMaterial;
    private readonly _scene: THREE.Scene;

    private _instancedMesh?: THREE.InstancedMesh;
    private _destroyed = false;

    private readonly _dummy = new THREE.Object3D();

    constructor(options: Partial<BushViewOptions> = {}) {
        this._options = {
            ...DEFAULT_BUSH_VIEW_OPTIONS,
            ...options,
        };

        this._state = State.getInstance().bushes;
        this._scene = View.getInstance().scene;

        this._geometry = this.createGeometry();

        const color = this._options.color;
        this._material = new THREE.MeshStandardMaterial({
            color: new THREE.Color(color[0], color[1], color[2]),
            roughness: this._options.roughness,
            flatShading: true,
        });

        this._state.events.on('ready', this.onReady);

        if (this._state.isReady) {
            this.build();
        }
    }

    get object3D() {
        return this._group;
    }

    destroy() {
        if (this._destroyed) return;

        this._destroyed = true;

        this._state.events.off('ready', this.onReady);

        this._group.removeFromParent();
        this._group.clear();

        this._geometry.dispose();
        this._material.dispose();
    }

    private onReady = () => {
        if (this._destroyed) return;

        this.build();
    };

    private build() {
        if (this._instancedMesh) {
            this._group.remove(this._instancedMesh);
            this._instancedMesh.dispose();
        }

        const placements = this._state.placements;

        if (placements.length === 0) return;

        const mesh = new THREE.InstancedMesh(
            this._geometry,
            this._material,
            placements.length,
        );

        mesh.castShadow = this._options.castShadow;
        mesh.receiveShadow = this._options.receiveShadow;

        for (let i = 0; i < placements.length; i++) {
            const placement = placements[i];

            this._dummy.position.set(
                placement.position[0],
                placement.position[1],
                placement.position[2],
            );

            this._dummy.rotation.set(0, placement.rotation, 0);
            this._dummy.scale.setScalar(placement.scale);
            this._dummy.updateMatrix();

            mesh.setMatrixAt(i, this._dummy.matrix);
        }

        mesh.instanceMatrix.needsUpdate = true;
        mesh.computeBoundingSphere();

        this._instancedMesh = mesh;
        this._group.add(mesh);

        this._scene.add(this._group);
    }

    private createGeometry(): THREE.BufferGeometry {
        const geometry = new THREE.IcosahedronGeometry(
            this._options.radius,
            this._options.subdivisions,
        );

        const position = geometry.getAttribute(
            'position',
        ) as THREE.BufferAttribute;

        for (let i = 0; i < position.count; i++) {
            const variation =
                this._options.minVertexVariation +
                Math.random() *
                (this._options.maxVertexVariation -
                    this._options.minVertexVariation);

            position.setXYZ(
                i,
                position.getX(i) * variation,
                position.getY(i) * variation,
                position.getZ(i) * variation,
            );
        }

        geometry.computeVertexNormals();

        return geometry;
    }
}
