import * as THREE from 'three';
import { View } from '../view';
import { State } from '../../state/state';
import { PLAYER_CAPSULE_LENGTH, PLAYER_RADIUS } from '../../state/player/default';
import { createPlayerMaterial } from '../materials/playerMaterial';
import type { SunState } from '../../state/sun/sun';
import type { Time } from '../../state/time';
import type { PlayerState } from '../../state/player/player';

// TODO : create player material and shaders with configs
export class Player {

    private _mesh!: THREE.Mesh<THREE.CapsuleGeometry, THREE.ShaderMaterial>;

    private _material!: THREE.ShaderMaterial;
    private _geometry!: THREE.CapsuleGeometry;

    private readonly _group = new THREE.Group();
    private readonly _player: PlayerState;
    private readonly _time: Time;
    private readonly _sun: SunState;

    constructor() {

        const view = View.getInstance();
        const state = State.getInstance();

        this._player = state.player;
        this._time = state.time;
        this._sun = state.sun;

        view.scene.add(this._group);

        this.setMesh();
    }

    private setMesh(): void {

        const playerGeometry = new THREE.CapsuleGeometry(
            PLAYER_RADIUS,
            PLAYER_CAPSULE_LENGTH,
            8,
            10,
            10
        );
        this._geometry = playerGeometry;
        this._material = createPlayerMaterial();

        this._mesh = new THREE.Mesh(this._geometry, this._material);

        this._group.add(this._mesh);
    }

    public update() {
        const pos = this._player.position.cur;
        const rot = this._player.rotation;
        this._mesh.position.set(pos.x, pos.y, pos.z);
        this._mesh.rotation.y = rot;


        // update uniforms for mesh material 
        this._material.uniforms.uTime.value = this._time.elapsedTime;
        this._material.uniforms.uSunColor.value = this._sun.color;
        this._material.uniforms.uLightDirection.value = View.getInstance().sun.lightDirection;
        this._material.uniforms.uSunIntensity.value = this._sun.intensity;

    }
    public dispose() {
        this._group.remove(this._mesh);
        this._mesh.geometry.dispose();
        this._mesh.material.dispose();
    }

}