import * as THREE from 'three';

import type { BushViewOptions } from './types';
import { DEFAULT_BUSH_VIEW_OPTIONS } from './default';
import type { BushesState } from '../../state/bush/bush';
import { State } from '../../state/state';
import { View } from '../view';
import { createBushMaterial } from '../materials/bushMaterial';
import type { SunState } from '../../state/sun/sun';

interface Clump {
    center: THREE.Vector3;
    radius: number;
}

interface Leaf {
    center: THREE.Vector3;
    shadingNormal: THREE.Vector3;
}

export class Bush {
    private readonly _state: BushesState;
    private readonly _sun: SunState;
    private readonly _scene: THREE.Scene;
    private readonly _options: BushViewOptions;

    private readonly _group = new THREE.Group();
    private readonly _geometry: THREE.BufferGeometry;
    private readonly _material: THREE.ShaderMaterial;
    private readonly _dummy = new THREE.Object3D();

    private _instancedMesh?: THREE.InstancedMesh;
    private _destroyed = false;

    constructor(options: Partial<BushViewOptions> = {}) {
        this._options = { ...DEFAULT_BUSH_VIEW_OPTIONS, ...options };

        const state = State.getInstance();
        const view = View.getInstance();

        this._state = state.bushes;
        this._sun = state.sun;
        this._scene = view.scene;

        this._geometry = this.createGeometry();
        this._material = createBushMaterial({
            radius: this._options.radius,
            deepColor: this._options.deepColor,
            standardColor: this._options.standardColor,
            lightColor: this._options.lightColor,
        });

        this._state.events.on('ready', this.onReady);

        if (this._state.isReady) {
            this.build();
        }
    }

    get object3D(): THREE.Group {
        return this._group;
    }

    public update(): void {
        const uniforms = this._material.uniforms;

        uniforms.uLightDirection.value.set(
            this._sun.direction[0],
            this._sun.direction[1],
            this._sun.direction[2],
        );
        uniforms.uSunIntensity.value = this._sun.intensity;
        uniforms.uSunColor.value.set(
            this._sun.color[0],
            this._sun.color[1],
            this._sun.color[2],
        );
    }

    public destroy(): void {
        if (this._destroyed) return;
        this._destroyed = true;

        this._state.events.off('ready', this.onReady);

        this._instancedMesh?.dispose();
        this._group.removeFromParent();
        this._group.clear();

        this._geometry.dispose();
        this._material.dispose();
    }

    private readonly onReady = (): void => {
        if (this._destroyed) return;
        this.build();
    };

    private build(): void {
        if (this._instancedMesh) {
            this._group.remove(this._instancedMesh);
            this._instancedMesh.dispose();
            this._instancedMesh = undefined;
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

        const { radius, floorHeight, groundSink } = this._options;

        for (let i = 0; i < placements.length; i++) {
            const placement = placements[i];
            const seed =
                placement.position[0] * 12.9898 + placement.position[2] * 78.233;

            const scaleX = placement.scale * (0.9 + Bush.hash(seed + 1) * 0.25);
            const scaleY = placement.scale * (0.7 + Bush.hash(seed + 2) * 0.2);
            const scaleZ = placement.scale * (0.9 + Bush.hash(seed + 3) * 0.25);

            const groundOffset = -floorHeight * radius * scaleY * (1 - groundSink);

            this._dummy.position.set(
                placement.position[0],
                placement.position[1] + groundOffset,
                placement.position[2],
            );
            this._dummy.rotation.set(0, placement.rotation, 0);
            this._dummy.scale.set(scaleX, scaleY, scaleZ);
            this._dummy.updateMatrix();
            mesh.setMatrixAt(i, this._dummy.matrix);
        }

        mesh.instanceMatrix.needsUpdate = true;
        mesh.computeBoundingSphere();

        this._instancedMesh = mesh;
        this._group.add(mesh);
        this._scene.add(this._group);
    }
    private static hash(seed: number): number {
        const value = Math.sin(seed * 127.1) * 43758.5453;
        return value - Math.floor(value);
    }

    private static randomUnitVector(): THREE.Vector3 {
        const y = Math.random() * 2 - 1;
        const angle = Math.random() * Math.PI * 2;
        const ring = Math.sqrt(1 - y * y);

        return new THREE.Vector3(
            ring * Math.cos(angle),
            y,
            ring * Math.sin(angle),
        );
    }

    private createClumps(): Clump[] {
        const { clumpCount, clumpSpread, clumpMinRadius, clumpMaxRadius } =
            this._options;

        const clumps: Clump[] = [];

        for (let i = 0; i < clumpCount; i++) {
            const isCenterClump = i === 0;
            const angle = Math.random() * Math.PI * 2;
            const distance = isCenterClump
                ? 0
                : clumpSpread * (0.5 + Math.random() * 0.5);

            clumps.push({
                center: new THREE.Vector3(
                    Math.cos(angle) * distance,
                    (Math.random() - 0.3) * 0.25,
                    Math.sin(angle) * distance,
                ),
                radius:
                    clumpMinRadius +
                    Math.random() * (clumpMaxRadius - clumpMinRadius),
            });
        }

        return clumps;
    }

    private createLeaves(): { leaves: Leaf[]; maxDistance: number } {
        const { leafCount, bushHeight, floorHeight } = this._options;

        const clumps = this.createClumps();
        const leaves: Leaf[] = [];
        let maxDistance = 0.0001;

        for (let i = 0; i < leafCount; i++) {
            const clump = clumps[i % clumps.length];
            const direction = Bush.randomUnitVector();
            const distance = clump.radius * (0.35 + 0.65 * Math.random());

            const center = new THREE.Vector3(
                clump.center.x + direction.x * distance,
                clump.center.y + direction.y * distance * bushHeight,
                clump.center.z + direction.z * distance,
            );
            center.y = Math.max(center.y, floorHeight);

            const outward =
                center.lengthSq() < 1e-6
                    ? new THREE.Vector3(0, 1, 0)
                    : center.clone().normalize();

            const shadingNormal = direction
                .clone()
                .multiplyScalar(0.6)
                .add(outward.multiplyScalar(0.4))
                .normalize();

            maxDistance = Math.max(maxDistance, center.length());
            leaves.push({ center, shadingNormal });
        }

        return { leaves, maxDistance };
    }

    private createGeometry(): THREE.BufferGeometry {
        const { radius, leafLength, leafWidthRatio, leafSizeVariation } =
            this._options;

        const { leaves, maxDistance } = this.createLeaves();
        const leafCount = leaves.length;

        const positions = new Float32Array(leafCount * 4 * 3);
        const normals = new Float32Array(leafCount * 4 * 3);
        const uvs = new Float32Array(leafCount * 4 * 2);
        const tones = new Float32Array(leafCount * 4);
        const depths = new Float32Array(leafCount * 4);
        const indices: number[] = [];

        const cornerUvs = [
            [0, 0],
            [1, 0],
            [0, 1],
            [1, 1],
        ];

        for (let i = 0; i < leafCount; i++) {
            const { center, shadingNormal } = leaves[i];

            const planeNormal = shadingNormal
                .clone()
                .add(Bush.randomUnitVector().multiplyScalar(0.7))
                .normalize();

            const reference =
                Math.abs(planeNormal.y) > 0.95
                    ? new THREE.Vector3(1, 0, 0)
                    : new THREE.Vector3(0, 1, 0);

            const tangent = new THREE.Vector3()
                .crossVectors(reference, planeNormal)
                .normalize();
            const bitangent = new THREE.Vector3().crossVectors(planeNormal, tangent);

            const angle = Math.random() * Math.PI * 2;
            const cos = Math.cos(angle);
            const sin = Math.sin(angle);

            const right = tangent.clone().multiplyScalar(cos).addScaledVector(bitangent, sin);
            const along = bitangent.clone().multiplyScalar(cos).addScaledVector(tangent, -sin);

            const length =
                leafLength *
                (1 - leafSizeVariation / 2 + Math.random() * leafSizeVariation);
            const halfWidth = length * leafWidthRatio * 0.5;

            const tone = Math.random();
            const depth = center.length() / maxDistance;

            for (let corner = 0; corner < 4; corner++) {
                const [u, v] = cornerUvs[corner];
                const vertexIndex = i * 4 + corner;

                const point = center
                    .clone()
                    .addScaledVector(along, (v - 0.5) * length)
                    .addScaledVector(right, (u - 0.5) * 2 * halfWidth);

                positions.set([point.x, point.y, point.z], vertexIndex * 3);
                normals.set(
                    [shadingNormal.x, shadingNormal.y, shadingNormal.z],
                    vertexIndex * 3,
                );
                uvs.set([u, v], vertexIndex * 2);
                tones[vertexIndex] = tone;
                depths[vertexIndex] = depth;
            }

            const base = i * 4;
            indices.push(base, base + 1, base + 2, base + 2, base + 1, base + 3);
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
        geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
        geometry.setAttribute('aTone', new THREE.BufferAttribute(tones, 1));
        geometry.setAttribute('aDepth', new THREE.BufferAttribute(depths, 1));
        geometry.setIndex(indices);

        geometry.scale(radius, radius, radius);

        return geometry;
    }
}