import * as THREE from 'three';
import vertexShader from './shaders/grass/vertex.vert';
import fragementShader from './shaders/grass/fragment.frag';
import { createFogUniforms } from './fogUniforms';

export default function createGrassMaterial() {

    const material = new THREE.ShaderMaterial({

        uniforms: {
            ...createFogUniforms(),
            uTime: { value: null },
            uPlayerPosition: { value: null },
            uGrassDistance: { value: null },
            uHeightMapTexelSize: { value: null },
            uCameraPosition: { value: null },
            uHeightMap: { value: null },
            uDirectionLight: { value: null },
            uSunIntensity: { value: null },
            uSunColor: { value: null },
            uTerrainCenter: { value: null }
        },
        vertexShader: vertexShader,
        fragmentShader: fragementShader,
        side: THREE.DoubleSide,
        fog: true,

    })

    return material;
}