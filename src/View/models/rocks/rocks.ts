import {
    Box3,
    Color,
    DoubleSide,
    InstancedMesh,
    Matrix4,
    MeshStandardMaterial,
    Object3D,
    Vector3,
    type Mesh,
} from 'three';
import { Model } from '../model';
import { DEFAULT_ROCKS_MODEL_OPTIONS, DEFAULT_ROCKS_OPTIONS } from './default';
import type { RocksOptions } from './types';
import { State } from '../../../state/state';
import type { RocksState } from '../../../state/rocks/rocks';

export class Rocks extends Model {
    private readonly _state: RocksState;
    private readonly _minScale: number;
    private readonly _maxScale: number;
    private _mesh?: InstancedMesh;
    private _meshMatrix = new Matrix4();
    private _applied = 0;

    private readonly _onReady = () => this.onData();

    constructor(options: Partial<RocksOptions> = {}) {
        super(DEFAULT_ROCKS_MODEL_OPTIONS, options);

        this._state = State.getInstance().rocks;
        this._minScale = options.minScale ?? DEFAULT_ROCKS_OPTIONS.minScale;
        this._maxScale = options.maxScale ?? DEFAULT_ROCKS_OPTIONS.maxScale;

        this._state.events.on('ready', this._onReady);
        if (this._state.isReady) this.onData();
    }

    public override setMeshMaterial(mesh: Mesh): void {
        mesh.material = new MeshStandardMaterial({
            color: new Color('#77736d'),
            roughness: 1,
            fog: false,
            toneMapped: false,
            side: DoubleSide,
        });
    }

    public override addToScene(): void {
        const source = this._group;
        source.updateMatrixWorld(true);

        let sourceMesh: Mesh | undefined;
        source.traverse(object => {
            if (!sourceMesh && (object as Mesh).isMesh) {
                sourceMesh = object as Mesh;
            }
        });
        if (!sourceMesh) {
            throw new Error('Stone GLB must contain a mesh to instance.');
        }

        this._meshMatrix.copy(source.matrixWorld).invert().multiply(sourceMesh.matrixWorld);
        sourceMesh.geometry.computeBoundingBox();
        const bounds = sourceMesh.geometry.boundingBox?.clone();
        if (!bounds) {
            throw new Error('Stone GLB mesh must have position bounds to instance.');
        }

        const modelBounds = new Box3().copy(bounds).applyMatrix4(this._meshMatrix);
        const center = modelBounds.getCenter(new Vector3());
        this._meshMatrix.premultiply(new Matrix4().makeTranslation(
            -center.x,
            -modelBounds.min.y,
            -center.z,
        ));
        this._mesh = new InstancedMesh(
            sourceMesh.geometry,
            sourceMesh.material,
            this._state.maxCount,
        );
        this._mesh.count = 0;
        this._mesh.frustumCulled = false;
        this._scene.add(this._mesh);
        this.onData();
    }

    private onData(): void {
        const mesh = this._mesh;
        if (!mesh) return;

        const dummy = new Object3D();
        const positions = this._state.positions;
        const count = this._state.count;

        for (let i = this._applied; i < count; i++) {
            dummy.position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
            dummy.rotation.y = Math.random() * Math.PI * 2;
            dummy.scale.setScalar(
                this._minScale + Math.random() * (this._maxScale - this._minScale),
            );
            dummy.updateMatrix();
            mesh.setMatrixAt(i, dummy.matrix.clone().multiply(this._meshMatrix));
        }

        this._applied = count;
        mesh.count = count;
        mesh.instanceMatrix.needsUpdate = true;
    }
}
