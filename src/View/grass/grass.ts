import type { Scene } from 'three';
import { State } from '../../state/state';
import type { Time } from '../../state/time';
import { DEFAULT_GRASS_CONFIG } from './default';
import type { GrassOptions } from './types';
import { View } from '../view';
import * as THREE from 'three';
import createGrassMaterial from '../materials/grassMaterial';

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

    private _geometry!: THREE.BufferGeometry;
    private _material!: THREE.ShaderMaterial;

    // TODO introduce noise 


    constructor(options: Partial<GrassOptions> = {}) {

        const { grassGridCount, chunkSize, bladeHeightRandomRatio, bladePositionRandomRatio, grassHeightRatio, grassWidthRatio } = DEFAULT_GRASS_CONFIG;

        const state = State.getInstance();
        const view = View.getInstance();

        this._time = state.time;
        this._scene = view.scene;

        this._grassGridCount = options.grassGridCount ?? grassGridCount;
        this._bladeHeightRandomnessRatio = options.bladeHeightRandomRatio ?? bladeHeightRandomRatio;
        this._cellCount = this._grassGridCount * this._grassGridCount;
        this._chunkSize = options.chunkSize ?? chunkSize;
        this._bladePositionRandomnessRatio = options.bladePositionRandomRatio ?? bladePositionRandomRatio;
        this._grassSize = this._chunkSize / this._grassGridCount;
        this._grassWidthRatio = options.grassWidthRatio ?? grassWidthRatio;
        this._grassHeightRatio = options.grassHeightRatio ?? grassHeightRatio;

        console.log("before set geometry");
        this.setGeometry();
        this.setMaterial();
        this.setMesh();

    }

    public setGeometry() {

        const count = this._grassGridCount;
        const size = this._chunkSize;
        const grassSize = this._grassSize;

        const centers = new Float32Array(count * 3 * 2);  //center btw two bottom vertices in 2D plan 
        const positions = new Float32Array(count * 3 * 3);

        for (let row = 0; row < count; row++) {

            const fragementcenterX = row * grassSize - (size * 0.5) + (grassSize * 0.5);
            for (let col = 0; col < count; col++) {
                const fragementcenterZ = col * grassSize - (size * 0.5) + (grassSize * 0.5);

                const centerX = fragementcenterX + ((Math.random() - 0.3) * grassSize * this._bladePositionRandomnessRatio);
                const centerZ = fragementcenterZ + ((Math.random() - 0.4) * grassSize * this._bladePositionRandomnessRatio);

                const indexOfCenterInBuffer = (row * count + col) * 6;
                const indexOfPositionInBuffer = (row * count + col) * 9;

                centers[indexOfCenterInBuffer] = centerX;
                centers[indexOfCenterInBuffer + 1] = centerZ;

                centers[indexOfCenterInBuffer + 2] = centerX;
                centers[indexOfCenterInBuffer + 3] = centerZ;

                centers[indexOfCenterInBuffer + 4] = centerX;
                centers[indexOfCenterInBuffer + 5] = centerZ;

                const halfBladeWidth = grassSize * this._grassWidthRatio * 0.5;
                const bladeHeight = grassSize * this._grassHeightRatio * (Math.random()) * this._bladeHeightRandomnessRatio;

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
        this._geometry = new THREE.BufferGeometry();

        this._geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        this._geometry.setAttribute('center', new THREE.BufferAttribute(centers, 2));

    }

    public setMaterial() {
        this._material = createGrassMaterial();

        this._material.uniforms.uTime.value = 0;
        this._material.uniforms.uPlayerPosition.value = new THREE.Vector3();


    }
    public setMesh() {
        const mesh = new THREE.Mesh(this._geometry, this._material);
        this._scene.add(mesh);
    }
    public update() {
        console.log("updating ...");
    }

}