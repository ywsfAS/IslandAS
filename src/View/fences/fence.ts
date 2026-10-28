import * as THREE from "three";
import type { FenceState } from "../../state/fences/fence";
import type { FenceOptions } from "./types";
import { DEFAULT_FENCE_OPTIONS } from "./default";
import { State } from "../../state/state";
import { View } from "../view";

export class Fence {

    private readonly _group = new THREE.Group();

    private readonly _options: FenceOptions;
    private readonly _postGeometry: THREE.BoxGeometry;
    private readonly _railGeometry: THREE.BoxGeometry;

    private readonly _material: THREE.MeshStandardMaterial;

    private readonly _axis = new THREE.Vector3(1, 0, 0);
    private readonly _state: FenceState;
    private readonly _dummy = new THREE.Object3D();
    private readonly _scene: THREE.Scene;

    constructor(options: Partial<FenceOptions> = {}) {

        const state = State.getInstance();
        const view = View.getInstance();
        this._state = state.fence;
        this._scene = view.scene;

        this._options = { ...options, ...DEFAULT_FENCE_OPTIONS };
        this._postGeometry = new THREE.BoxGeometry(
            this._options.postWidth,
            this._options.postHeight,
            this._options.postDepth,
        );

        this._railGeometry = new THREE.BoxGeometry(
            this._options.railWidth,
            this._options.railHeight,
            this._options.railDepth,
        );

        this._postGeometry.translate(0, 0.5, 0);
        this._railGeometry.translate(0, 0.5, 0);

        this._material = new THREE.MeshStandardMaterial({
            color: this._options.color,
        });

        this._state.events.on("ready", this.build);
    }

    get object3D() {
        return this._group;
    }

    private build = () => {
        this._group.clear();

        const positions = this._state.positions;
        const rows = positions.length / 6;

        if (rows === 0) return;

        const postCount = rows * 2;
        const railCount = Math.max(0, rows - 1) * 2;

        const posts = new THREE.InstancedMesh(
            this._postGeometry,
            this._material,
            postCount,
        );

        const rails = new THREE.InstancedMesh(
            this._railGeometry,
            this._material,
            railCount * 2,
        );

        let postIndex = 0;
        let railIndex = 0;

        const start = new THREE.Vector3();
        const end = new THREE.Vector3();
        const direction = new THREE.Vector3();

        for (let i = 0; i < rows; i++) {
            for (let side = 0; side < 2; side++) {
                const index = i * 6 + side * 3;

                start.set(
                    positions[index],
                    positions[index + 1],
                    positions[index + 2],
                );

                // Post transform
                this._dummy.position.copy(start);
                this._dummy.position.y += 1;
                this._dummy.rotation.set(0, 0, 0);
                this._dummy.scale.set(1, 1, 1);
                this._dummy.translateY(0.5);
                this._dummy.updateMatrix();

                posts.setMatrixAt(postIndex++, this._dummy.matrix);

                // there is no post to connect to
                if (i === 0) continue;

                const previousIndex = (i - 1) * 6 + side * 3;

                end.set(
                    positions[previousIndex],
                    positions[previousIndex + 1],
                    positions[previousIndex + 2],
                );

                direction.subVectors(start, end);
                const length = direction.length();

                if (length === 0) continue;

                direction.normalize();

                // first rail transform matrix 
                this._dummy.position.copy(start).add(end).multiplyScalar(0.5);
                this._dummy.position.y += 0.6;
                this._dummy.quaternion.setFromUnitVectors(
                    this._axis,
                    direction,
                );
                this._dummy.scale.set(length, 1, 1);
                this._dummy.updateMatrix();

                rails.setMatrixAt(railIndex++, this._dummy.matrix);

                // second rail transform matrix 
                this._dummy.position.y += 1.6;
                this._dummy.updateMatrix();

                rails.setMatrixAt(railIndex++, this._dummy.matrix);
            }
        }

        posts.count = postIndex;
        rails.count = railIndex;

        posts.instanceMatrix.needsUpdate = true;
        rails.instanceMatrix.needsUpdate = true;

        this._group.add(posts, rails);
        this._scene.add(this._group);
    };

    public destroy() {
        this._state.events.off("ready", this.build);

        this._group.clear();
        this._postGeometry.dispose();
        this._railGeometry.dispose();
        this._material.dispose();
    }
}