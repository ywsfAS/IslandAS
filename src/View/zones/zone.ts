import type { vec2 } from "gl-matrix";
import { State } from "../../state/state";
import type { ZoneState } from "../../state/zones/zone";
import { createRingMaterial } from "../materials/ringMaterial";
import { View } from "../view";
import { DEFAULT_ZONE_CONFIGS } from './default';
import { setZoneTitle, type ZoneTitleArgs } from "./helpers";
import type { RingGeometryParams, ZoneParams } from './types';
import * as THREE from 'three';
import type { Time } from "../../state/time";
export abstract class Zone {
    protected _state: ZoneState;
    protected _scene: THREE.Scene;
    protected _ring!: THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial>;


    private readonly _ringGeometryParams: RingGeometryParams;
    private readonly _ringMaterialParams?: Partial<THREE.MeshBasicMaterialParameters>;
    private readonly _time: Time;




    constructor(state: ZoneState, options: Partial<ZoneParams> = {}) {
        const view = View.getInstance();
        this._scene = view.scene;
        this._state = state;
        this._time = State.getInstance().time;

        const { geometry, matrial } = DEFAULT_ZONE_CONFIGS;
        this._ringGeometryParams = { ...options.geometry, ...geometry };
        this._ringMaterialParams = { ...options.matrial, ...matrial };

        this.setMesh();

        this._state.events.on('onEnter', () => this.onEnter());
        this._state.events.on('onExit', () => this.onExit());
    }
    public onEnter(): void {
        const titleArgs: ZoneTitleArgs = {
            title: this._state.title,
            subtitle: this._state.subtitle,
            accent: "black",
            titleColor: "black"
        }
        setZoneTitle(titleArgs);

    };
    public onExit(): void {

    };

    public setMesh() {
        const radius = this._state.radius;
        const { outerRadius, thetaSegments } = this._ringGeometryParams;
        const innerRadius = radius - outerRadius;
        const geometry = this.setGeometry(this._state.center, innerRadius, radius, thetaSegments)

        const material = createRingMaterial();
        material.uniforms.uSegments.value = thetaSegments;

        this._ring = new THREE.Mesh(geometry, material);

        this._ring.position.set(0, 4, 0);

        this._scene.add(this._ring);
    }
    private setGeometry(center: vec2, innerRadius: number, outerRadius: number, segments: number, gap: number = 0, startAngle: number = Math.PI / 2) {

        const positions = [];
        const indexes = [];
        const indices = [];

        const steps = 2 * Math.PI / segments;

        const [x, y] = center;

        for (let i = 0; i < segments; i++) {
            const angle1 = startAngle + i * steps - gap;
            const angle2 = startAngle + (i + 1) * steps + gap;


            const xInner1 = innerRadius * Math.cos(angle1) + x;
            const zInner1 = innerRadius * Math.sin(angle1) + y;
            const xOuter1 = outerRadius * Math.cos(angle1) + x;
            const zOuter1 = outerRadius * Math.sin(angle1) + y;
            const xInner2 = innerRadius * Math.cos(angle2) + x;
            const zInner2 = innerRadius * Math.sin(angle2) + y;
            const xOuter2 = outerRadius * Math.cos(angle2) + x;
            const zOuter2 = outerRadius * Math.sin(angle2) + y;

            positions.push(
                xInner1, 0, zInner1,
                xOuter1, 0, zOuter1,
                xInner2, 0, zInner2,
                xOuter2, 0, zOuter2,
            );
            const base = i * 4;

            indices.push(base, base + 1, base + 2, base + 2, base + 1, base + 3);
            indexes.push(i, i, i, i);

        };
        const geometry = new THREE.BufferGeometry();

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('aIndex', new THREE.Float32BufferAttribute(indexes, 1));

        geometry.setIndex(indices);


        return geometry;

    }
    public update() {
        this._ring.material.uniforms.uProgress.value = this._state.blend();
        this._ring.material.uniforms.uTime.value = this._time.elapsedTime;
    }
}