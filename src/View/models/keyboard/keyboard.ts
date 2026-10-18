import * as THREE from 'three';
import { Model } from '../model';
import { DEFAULT_KEYBOARD_OPTIONS } from './default';
import type { KeyboardOptions } from './types';

const KEY_CAP_MIN_BOTTOM_Z = 0.8;
const KEY_CAP_MIN_TOP_Z = 1.1;

export class Keyboard extends Model {
    constructor(options: KeyboardOptions = {}) {
        super(DEFAULT_KEYBOARD_OPTIONS, options);
    }

    protected override setMeshMaterial(mesh: THREE.Mesh): void {
        const geometry = mesh.geometry;
        const index = geometry.index;
        const positions = geometry.getAttribute('position');

        if (!index || index.count % 3 !== 0) {
            throw new Error('Keyboard GLB mesh must have indexed triangle geometry.');
        }

        const parents = Array.from({ length: positions.count }, (_, vertex) => vertex);
        const findRoot = (vertex: number): number => {
            let root = vertex;
            while (parents[root] !== root) {
                root = parents[root];
            }
            while (parents[vertex] !== vertex) {
                const next = parents[vertex];
                parents[vertex] = root;
                vertex = next;
            }
            return root;
        };

        for (let offset = 0; offset < index.count; offset += 3) {
            const first = index.getX(offset);
            const second = index.getX(offset + 1);
            const third = index.getX(offset + 2);
            const root = findRoot(first);
            parents[findRoot(second)] = root;
            parents[findRoot(third)] = root;
        }

        const componentBounds = new Map<number, { minZ: number; maxZ: number }>();
        for (let vertex = 0; vertex < positions.count; vertex++) {
            const root = findRoot(vertex);
            const z = positions.getZ(vertex);
            const bounds = componentBounds.get(root);
            if (bounds) {
                bounds.minZ = Math.min(bounds.minZ, z);
                bounds.maxZ = Math.max(bounds.maxZ, z);
            } else {
                componentBounds.set(root, { minZ: z, maxZ: z });
            }
        }

        const bodyIndices: number[] = [];
        const keyIndices: number[] = [];
        for (let offset = 0; offset < index.count; offset += 3) {
            const triangle = [
                index.getX(offset),
                index.getX(offset + 1),
                index.getX(offset + 2),
            ];
            const component = componentBounds.get(findRoot(triangle[0]));
            const target = component
                && component.minZ > KEY_CAP_MIN_BOTTOM_Z
                && component.maxZ > KEY_CAP_MIN_TOP_Z
                ? keyIndices
                : bodyIndices;
            target.push(...triangle);
        }

        geometry.setIndex([...bodyIndices, ...keyIndices]);
        geometry.clearGroups();
        if (bodyIndices.length > 0) {
            geometry.addGroup(0, bodyIndices.length, 0);
        }
        if (keyIndices.length > 0) {
            geometry.addGroup(bodyIndices.length, keyIndices.length, 1);
        }

        mesh.material = [
            new THREE.MeshBasicMaterial({ color: 0xffffff, fog: false, toneMapped: false }),
            new THREE.MeshBasicMaterial({ color: 0x3b3b3b, fog: false, toneMapped: false }),
        ];
    }
}
