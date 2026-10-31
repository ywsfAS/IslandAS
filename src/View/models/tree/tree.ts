import { Color, DoubleSide, InstancedBufferAttribute, InstancedMesh, Material, Matrix4, MeshBasicMaterial, MeshStandardMaterial, Object3D, Texture, TextureLoader, type Mesh } from "three";
import { Model } from "../model";
import { DEFAULT_TREE_OPTIONS } from './default';
import type { TreeOptions } from './types';
import { createFoliageMaterial } from "../../materials/folliageMaterial";
import foliageAlpha from '/textures/foliage.png';
import type { TreesState } from "../../../state/trees/trees";
import { State } from "../../../state/state";
import type { PlayerState } from "../../../state/player/player";

export class Tree extends Model {
    private _texture: Texture;
    private readonly _state: TreesState;
    private _foliageMesh: InstancedMesh;
    private _trunkMesh: InstancedMesh;
    private _applied = 0;

    private _foliageMatrix: Matrix4;
    private _trunkMatrix: Matrix4;
    private _player: PlayerState;


    private readonly _onReady = () => this.onData();

    constructor(options: Partial<TreeOptions> = {}) {
        super(DEFAULT_TREE_OPTIONS, options);

        const state = State.getInstance();

        this._state = state.trees;
        this._player = state.player;

        const loader = new TextureLoader();
        this._texture = loader.load(foliageAlpha);

        this._state.events.on('ready', this._onReady);
        if (this._state.isReady) this.onData();
    }

    public override onLoad() {
    }
    public override setMeshMaterial(mesh: Mesh): void {
        const name = mesh.name;
        console.log(this._texture);

        if (name === "foliage") {
            mesh.material = createFoliageMaterial(this._texture);
            return;
        }

        mesh.material = new MeshStandardMaterial({
            color: new Color("#6B4423"),
            toneMapped: false,
            fog: false,
            side: DoubleSide
        })

    }
    public onData(): void {
        const dummy = new Object3D();
        const p = this._state.positions;
        const count = this._state.count;

        for (let i = this._applied; i < count; i++) {
            dummy.position.set(p[i * 3], p[i * 3 + 1], p[i * 3 + 2]);
            dummy.rotation.y = Math.random() * Math.PI * 2;
            dummy.scale.setScalar(0.4 + Math.random() * 3);
            dummy.updateMatrix();

            const foliageInstanceMatrix = dummy.matrix.clone()
                .multiply(this._foliageMatrix);

            const trunkInstanceMatrix = dummy.matrix.clone()
                .multiply(this._trunkMatrix);
            this._foliageMesh.setMatrixAt(i, foliageInstanceMatrix);
            this._trunkMesh.setMatrixAt(i, trunkInstanceMatrix);
        }


        this._applied = count;
        this._foliageMesh.count = count;
        this._trunkMesh.count = count;

        this._foliageMesh.instanceMatrix.needsUpdate = true;
        this._trunkMesh.instanceMatrix.needsUpdate = true;

    }
    public override addToScene() {
        const mesh = this._group;
        const foliage = mesh.getObjectByName('foliage') as Mesh;
        const trunk = mesh.getObjectByName('trunk') as Mesh;

        const instanceFoliage = new InstancedMesh(foliage.geometry, foliage.material, 200);
        const instanceTrunk = new InstancedMesh(trunk.geometry, trunk.material, 200);

        instanceFoliage.frustumCulled = false;
        instanceTrunk.frustumCulled = false;

        this._foliageMesh = instanceFoliage;
        this._trunkMesh = instanceTrunk;

        const foliageMatrix = mesh.matrixWorld.clone().invert()
            .multiply(foliage.matrixWorld);

        const trunkMatrix = mesh.matrixWorld.clone().invert()
            .multiply(trunk.matrixWorld);

        this._foliageMatrix = foliageMatrix;
        this._trunkMatrix = trunkMatrix;

        this._scene.add(instanceFoliage);
        this._scene.add(instanceTrunk);



    }
    public update() {


    }


}