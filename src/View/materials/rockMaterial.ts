import * as THREE from 'three';
import vertexShader from './shaders/rock/vertex.vert';
import fragmentShader from './shaders/rock/fragment.frag';
import { createFogUniforms } from './fogUniforms';

export function createRockMaterial(): THREE.ShaderMaterial {

    const material = new THREE.ShaderMaterial({

        uniforms: {
            ...createFogUniforms(),
            uLightDirection : {value : null},
            uSunColor : {value : null},
            uSunIntensity : {value : null}

        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        fog: true,

    });
    return material;
}