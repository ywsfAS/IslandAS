import * as THREE from 'three';
import type { PlayerState } from '../../state/player/player';
import { State } from '../../state/state';
import type { Time } from '../../state/time';
import { View } from '../view';

export class Ribbon {
    private readonly _pointsCount: number = 60;
    private _mesh;
    private _windDir = new THREE.Vector3(1, 1, 1);
    private readonly _centerline: THREE.Vector3[] = [];
    private readonly _ribbonWidth = 0.5;
    private readonly _lifetime = 4;
    private readonly _travelSpeed = 5;
    private _age = 0;
    private _spawnSide = 1;
    private _origin = new THREE.Vector3();
    private _phaseOffset = 0;
    private _waveSpeed = 5.4;
    private _waveAmplitude = 0.8;
    private _liftAmplitude = 0.5;

    private readonly _player: PlayerState;
    private readonly _time: Time;
    private readonly _scene: THREE.Scene;

    constructor() {

        const state = State.getInstance();
        const view = View.getInstance();

        this._player = state.player;
        this._time = state.time;
        this._scene = view.scene;


        this.setMesh();

        this._scene.add(this._mesh);
    }

    public setMesh() {

        const positions = new Float32Array(this._pointsCount * 2 * 3);
        const indices: number[] = [];

        for (let i = 0; i < this._pointsCount; i++) {
            this._centerline.push(new THREE.Vector3());

            const index = i * 6;
            positions[index] = this._centerline[i].x;
            positions[index + 1] = this._centerline[i].y;
            positions[index + 2] = this._centerline[i].z;
            positions[index + 3] = this._centerline[i].x;
            positions[index + 4] = this._centerline[i].y;
            positions[index + 5] = this._centerline[i].z;
        }
        for (let i = 0; i < this._pointsCount - 1; i++) {
            const index = i * 2;
            indices.push(index, index + 1, index + 2);
            indices.push(index + 2, index + 1, index + 3);
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setIndex(indices);

        const material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.frustumCulled = false;

        this._mesh = mesh;
        this.spawn();

    }
    public update() {
        const up = new THREE.Vector3(0, 1, 0);
        const positions = this._mesh.geometry.attributes.position;
        const time = this._time.elapsedTime;

        this._age += this._time.deltaTime;
        if (this._age >= this._lifetime) {
            this.spawn();
        }

        const direction = this._windDir.clone().normalize();
        const sideDirection = new THREE.Vector3().crossVectors(direction, up).normalize();

        for (let i = 0; i < this._pointsCount; i++) {
            const progress = i / (this._pointsCount - 1);
            const phase = progress * Math.PI * 2 * 3
                + this._age * this._waveSpeed
                + this._phaseOffset;
            const radius = this._waveAmplitude * progress;
            const sideWobble = Math.cos(phase) * radius
                + Math.sin(phase * 2.3 + this._phaseOffset) * 0.15 * progress;
            const verticalWobble = Math.sin(phase) * radius * 0.8
                + Math.sin(phase * 0.45 + time) * this._liftAmplitude * progress;

            this._centerline[i].copy(this._origin)
                .addScaledVector(direction, this._travelSpeed * this._age + progress * 30)
                .addScaledVector(sideDirection, sideWobble)
                .addScaledVector(up, verticalWobble);
        }

        for (let i = 0; i < this._pointsCount; i++) {
            const previous = this._centerline[Math.max(i - 1, 0)];
            const next = this._centerline[Math.min(i + 1, this._pointsCount - 1)];
            const tangent = next.clone().sub(previous);
            const side = new THREE.Vector3().crossVectors(tangent, up);
            if (side.lengthSq() < 0.0001) {
                side.set(0, 0, 1);
            }
            const progress = i / (this._pointsCount - 1);
            const taper = 0.25 + 0.75 * Math.sin(Math.PI * progress);
            side.normalize().multiplyScalar(this._ribbonWidth * taper / 2);

            const point = this._centerline[i];
            const index = i * 2;
            positions.setXYZ(index, point.x + side.x, point.y + side.y, point.z + side.z);
            positions.setXYZ(index + 1, point.x - side.x, point.y - side.y, point.z - side.z);
        }

        const material = this._mesh.material;
        const fadeIn = THREE.MathUtils.smoothstep(this._age, 0, 0.25);
        const fadeOut = 1 - THREE.MathUtils.smoothstep(this._age, this._lifetime - 0.8, this._lifetime);
        material.opacity = fadeIn * fadeOut;

        positions.needsUpdate = true;
        this._mesh.geometry.computeBoundingSphere();
    }

    private spawn(): void {
        const rotation = this._player.rotation;
        this._windDir.set(-Math.sin(rotation), 0, -Math.cos(rotation)).normalize();

        const direction = this._windDir.clone().normalize();
        const sideDirection = new THREE.Vector3()
            .crossVectors(direction, new THREE.Vector3(0, 1, 0))
            .normalize();

        this._age = 0;
        this._spawnSide *= -1;
        this._phaseOffset = Math.random() * Math.PI * 2;
        this._waveSpeed = 1.8 + Math.random() * 1.8;
        this._waveAmplitude = 1.2 + Math.random() * 1.2;
        this._liftAmplitude = 0.25 + Math.random() * 0.5;
        this._origin.copy(this._player.position.cur)
            .addScaledVector(sideDirection, this._spawnSide * 0.7)
            .y += 5.5;
    }


}