import type { ZoneState } from "../../state/zones/zone";
import { View } from "../view";
import { DEFAULT_ZONE_CONFIGS } from './default';
import type { RingGeometryParams, ZoneParams } from './types';
import * as THREE from 'three';
export abstract class Zone {
    protected _state: ZoneState;
    protected _scene: THREE.Scene;


    private readonly _ringGeometryParams: Partial<RingGeometryParams>;
    private readonly _ringMaterialParams?: Partial<THREE.MeshBasicMaterialParameters>;




    constructor(state: ZoneState, options: Partial<ZoneParams> = {}) {
        const view = View.getInstance();
        this._scene = view.scene;
        this._state = state;

        const { geometry, matrial } = DEFAULT_ZONE_CONFIGS;
        this._ringGeometryParams = { ...options.geometry, ...geometry };
        this._ringMaterialParams = { ...options.matrial, ...matrial };

        this.setMesh();
    }
    public setMesh() {
        const radius = this._state.radius;
        const x = this._state.center[0];
        const z = this._state.center[1];
        const { outerRadius, thetaSegments, phiSegments } = this._ringGeometryParams;
        const innerRadius = radius - (outerRadius ?? 0);
        const geometry = new THREE.RingGeometry(radius, innerRadius, thetaSegments, phiSegments);
        const material = new THREE.MeshBasicMaterial(this._ringMaterialParams);

        const ring = new THREE.Mesh(geometry, material);
        ring.rotateX(-Math.PI / 2);
        ring.position.set(x, 3, z);

        this._scene.add(ring);
    }
    public update() {

    }
}