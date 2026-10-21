import type { Scene } from 'three';
import { State } from '../../state/state';
import type { Time } from '../../state/time';
import { DEFAULT_GRASS_CONFIG } from './default';
import type { GrassOptions } from './types';
import { View } from '../view';
import * as THREE from 'three';
import createGrassMaterial from '../materials/grassMaterial';
import type { PlayerState } from '../../state/player/player';
import type { CameraState } from '../../state/camera/camera';
import type { Terrain } from '../terrain/terrain';
import type { Sun } from '../sun/sun';
import type { ChunksPosition } from '../../state/terrains/types';
import { CHUNKS_POS } from '../../state/terrains/default';
import { xor } from 'three/tsl';

interface GrassChunk {
    geometry: THREE.BufferGeometry;
    material: THREE.ShaderMaterial;
    mesh: THREE.Mesh;
    id: ChunksPosition;
    terrainSize: number;
}

export class Grass {

    private _grassGridCount: number;
    private _chunkSize: number;
    private _cellCount: number;
    private _grassSize: number;


    private _grassWidthRatio: number;
    private _grassHeightRatio: number;

    private _bladePositionRandomnessRatio: number;
    private _bladeHeightRandomnessRatio: number;

    private readonly _time: Time;
    private readonly _scene: Scene;
    private readonly _player: PlayerState;
    private readonly _camera: CameraState;
    private readonly _sun: Sun;

    private _chunks = new Map<string, GrassChunk>();

    // TODO introduce noise 


    constructor(options: Partial<GrassOptions> = {}) {

        const { grassGridCount, chunkSize, bladeHeightRandomRatio, bladePositionRandomRatio, grassHeightRatio, grassWidthRatio } = DEFAULT_GRASS_CONFIG;

        const state = State.getInstance();
        const view = View.getInstance();

        this._time = state.time;
        this._scene = view.scene;
        this._player = state.player;
        this._camera = state.camera;
        this._sun = view.sun;

        this._grassGridCount = options.grassGridCount ?? grassGridCount;
        this._bladeHeightRandomnessRatio = options.bladeHeightRandomRatio ?? bladeHeightRandomRatio;
        this._cellCount = this._grassGridCount * this._grassGridCount;
        this._chunkSize = options.chunkSize ?? chunkSize;
        this._bladePositionRandomnessRatio = options.bladePositionRandomRatio ?? bladePositionRandomRatio;
        this._grassSize = this._chunkSize / this._grassGridCount;
        this._grassWidthRatio = options.grassWidthRatio ?? grassWidthRatio;
        this._grassHeightRatio = options.grassHeightRatio ?? grassHeightRatio;

        view.terrains.events.on('terrain-view-created', (terrain: Terrain) => {
            const terrainState = terrain.state();
            terrainState.events.on('ready', () => {
                this.createChunk(terrain);
            });
        });
        view.terrains.events.on('terrain-view-destroyed', (terrain: Terrain) => {
            this.disposeChunk(terrain);
        });

    }
    get grassSize() {
        return this._grassSize;
    }
    get chunkSize() {
        return this._chunkSize;
    }

    private createGeometry(): THREE.BufferGeometry {

        const count = this._grassGridCount;
        const size = this._chunkSize;
        const grassSize = this._grassSize;

        const centers = new Float32Array(count * count * 3 * 2);  //center btw two bottom vertices in 2D plan 
        const positions = new Float32Array(count * count * 3 * 3);

        for (let row = 0; row < count; row++) {

            const fragementcenterX = row * grassSize - (size * 0.5) + (grassSize * 0.5);
            for (let col = 0; col < count; col++) {
                const fragementcenterZ = col * grassSize - (size * 0.5) + (grassSize * 0.5);

                const centerX = fragementcenterX + ((Math.random() - 0.5) * grassSize * this._bladePositionRandomnessRatio);
                const centerZ = fragementcenterZ + ((Math.random() - 0.5) * grassSize * this._bladePositionRandomnessRatio);

                const indexOfCenterInBuffer = (row * count + col) * 6;
                const indexOfPositionInBuffer = (row * count + col) * 9;

                centers[indexOfCenterInBuffer] = centerX;
                centers[indexOfCenterInBuffer + 1] = centerZ;

                centers[indexOfCenterInBuffer + 2] = centerX;
                centers[indexOfCenterInBuffer + 3] = centerZ;

                centers[indexOfCenterInBuffer + 4] = centerX;
                centers[indexOfCenterInBuffer + 5] = centerZ;

                const halfBladeWidth = grassSize * this._grassWidthRatio * 0.5;
                const bladeHeight = grassSize * this._grassHeightRatio * (Math.random() + 0.8) * this._bladeHeightRandomnessRatio;

                positions[indexOfPositionInBuffer] = -halfBladeWidth;
                positions[indexOfPositionInBuffer + 1] = 0;
                positions[indexOfPositionInBuffer + 2] = 0;

                positions[indexOfPositionInBuffer + 3] = 0;
                positions[indexOfPositionInBuffer + 4] = bladeHeight;
                positions[indexOfPositionInBuffer + 5] = 0;

                positions[indexOfPositionInBuffer + 6] = halfBladeWidth;
                positions[indexOfPositionInBuffer + 7] = 0;
                positions[indexOfPositionInBuffer + 8] = 0;



            }



        }
        const geometry = new THREE.BufferGeometry();

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('center', new THREE.BufferAttribute(centers, 2));
        return geometry;

    }

    private createChunk(terrain: Terrain) {
        const terrainState = terrain.state();
        const key = `${terrainState.id[0]},${terrainState.id[1]}`;
        if (this._chunks.has(key)) {
            return;
        }

        const geometry = this.createGeometry();
        const material = createGrassMaterial();
        material.uniforms.uTime.value = this._time.elapsedTime;
        material.uniforms.uPlayerPosition.value = this._player.position.cur.clone();
        material.uniforms.uGrassDistance.value = this._chunkSize;
        material.uniforms.uHeightMapTexelSize.value = 1 / Math.max(1, terrainState.resolution - 1);
        material.uniforms.uCameraPosition.value = new THREE.Vector3(
            this._camera.position[0],
            this._camera.position[1],
            this._camera.position[2]
        );
        material.uniforms.uHeightMap.value = terrain.getHeightTexture();
        material.uniforms.uDirectionLight.value = this._sun.lightDirection;
        material.uniforms.uSunIntensity.value = this._sun.intensity;
        material.uniforms.uSunColor.value = this._sun.color;
        material.uniforms.uTerrainCenter.value = terrainState.center;

        const mesh = new THREE.Mesh(geometry, material);
        mesh.frustumCulled = false;
        const playerChunkX = Math.floor(
            (this._player.position.cur.x + terrainState.size / 2) / terrainState.size
        );
        const playerChunkZ = Math.floor(
            (this._player.position.cur.z + terrainState.size / 2) / terrainState.size
        );
        mesh.visible = terrainState.id[0] === playerChunkX && terrainState.id[1] === playerChunkZ;
        this._scene.add(mesh);
        this._chunks.set(key, {
            geometry,
            material,
            mesh,
            id: terrainState.id,
            terrainSize: terrainState.size
        });
    }
    public update() {
        const playerPosition = this._player.position.cur;
        for (const { id, terrainSize, mesh, material } of this._chunks.values()) {


            const playerChunkX = Math.floor(
                (playerPosition.x + terrainSize / 2) / terrainSize
            );

            const playerChunkZ = Math.floor(
                (playerPosition.z + terrainSize / 2) / terrainSize
            );

            const fractionX =
                (playerPosition.x + terrainSize / 2) / terrainSize -
                playerChunkX;

            const fractionZ =
                (playerPosition.z + terrainSize / 2) / terrainSize -
                playerChunkZ;

            const diff = 0.25;

            const directionsX = [0];
            const directionsZ = [0];

            if (fractionX >= 1 - diff) directionsX.push(1);
            if (fractionX <= diff) directionsX.push(-1);

            if (fractionZ >= 1 - diff) directionsZ.push(1);
            if (fractionZ <= diff) directionsZ.push(-1);

            const possiblePositions = new Set(
                CHUNKS_POS
                    .filter(([x, z]) =>
                        directionsX.includes(x) &&
                        directionsZ.includes(z)
                    )
                    .map(([x, z]) =>
                        `${playerChunkX + x},${playerChunkZ + z}`
                    )
            );

            const key = `${id[0]},${id[1]}`;

            mesh.visible = possiblePositions.has(key);


            material.uniforms.uPlayerPosition.value = playerPosition;
            material.uniforms.uCameraPosition.value.set(
                this._camera.position[0],
                this._camera.position[1],
                this._camera.position[2]
            );
            material.uniforms.uDirectionLight.value = this._sun.lightDirection;
            material.uniforms.uSunIntensity.value = this._sun.intensity;
            material.uniforms.uSunColor.value = this._sun.color;
            material.uniforms.uTime.value = this._time.elapsedTime;
        }
    }
    private disposeChunk(terrain: Terrain) {
        const terrainId = terrain.state().id;
        const key = `${terrainId[0]},${terrainId[1]}`;
        const chunk = this._chunks.get(key);
        if (!chunk) {
            return;
        }

        this._scene.remove(chunk.mesh);
        chunk.geometry.dispose();
        chunk.material.uniforms.uHeightMap.value.dispose();
        chunk.material.dispose();
        this._chunks.delete(key);
    }

}