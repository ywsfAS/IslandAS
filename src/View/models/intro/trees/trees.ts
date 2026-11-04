import * as THREE from "three";
import { vec2 } from "gl-matrix";
import { Model } from "../../model";
import { State } from "../../../../state/state";
import type { TerrainState } from "../../../../state/terrain/terrain";
import { DEFAULT_INTRO_TREE_MATERIAL, DEFAULT_INTRO_TREE_OPTIONS } from "./default";
import type { IntroTreeOptions, IntroTreeType } from "./types";
import { createFoliageMaterial } from "../../../materials/folliageMaterial";
import foliageAlpha from "/textures/foliage.png";

interface TreeInstance {
    mesh: THREE.InstancedMesh;
    sourceMatrix: THREE.Matrix4;
}

export class IntroTree extends Model {
    private readonly _type: IntroTreeType;
    private readonly _positions: IntroTreeOptions["positions"];
    private readonly _foliageTexture: THREE.Texture;
    private readonly _instances: TreeInstance[] = [];
    private readonly _terrains = State.getInstance().Terrains;
    private readonly _point = vec2.create();
    private readonly _dummy = new THREE.Object3D();

    constructor(type: IntroTreeType, options: IntroTreeOptions) {
        super(DEFAULT_INTRO_TREE_OPTIONS[type]);
        this._type = type;
        this._positions = options.positions.filter(position => position.type === type);
        this._foliageTexture = new THREE.TextureLoader().load(foliageAlpha);
    }

    protected override setMeshMaterial(mesh: THREE.Mesh): void {
        if (this._type === "tree" && mesh.name === "foliage") {
            mesh.material = createFoliageMaterial(this._foliageTexture, "#31560f");
            return;
        }

        mesh.material = new THREE.MeshStandardMaterial({
            ...DEFAULT_INTRO_TREE_MATERIAL,
            map: this._type === "tree" ? undefined : this._introTexture,
        });
    }

    protected override addToScene(): void {
        if (this._positions.length === 0) return;

        this._group.updateMatrixWorld(true);
        const modelMatrix = this._group.matrixWorld.clone().invert();

        this._group.traverse(object => {
            if (!(object instanceof THREE.Mesh)) return;

            const mesh = new THREE.InstancedMesh(
                object.geometry,
                object.material,
                this._positions.length,
            );
            mesh.frustumCulled = false;
            this._scene.add(mesh);
            this._instances.push({
                mesh,
                sourceMatrix: modelMatrix.clone().multiply(object.matrixWorld),
            });
        });

        this._terrains.events.on("create", this.handleTerrain);
        for (const terrain of this._terrains.terrains.values()) {
            this.handleTerrain(terrain);
        }
        this.updateInstances();
    }

    private readonly handleTerrain = (terrain: TerrainState): void => {
        if (terrain.isReady) {
            this.updateInstances();
        } else {
            terrain.events.once("ready", () => this.updateInstances());
        }
    };

    private updateInstances(): void {
        for (const instance of this._instances) {
            for (let index = 0; index < this._positions.length; index++) {
                const position = this._positions[index];
                vec2.set(this._point, position.x, position.z);
                const y = this._terrains.getHeightAt(this._point) ?? 0;

                this._dummy.position.set(position.x, y, position.z);
                this._dummy.rotation.set(0, position.rotation, 0);
                this._dummy.scale.set(position.scale, position.scale, position.scale);
                this._dummy.updateMatrix();
                this._dummy.matrix.multiply(instance.sourceMatrix);
                instance.mesh.setMatrixAt(index, this._dummy.matrix);
            }

            instance.mesh.instanceMatrix.needsUpdate = true;
        }
    }
}
