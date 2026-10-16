import * as THREE from 'three';
import vertexShader from './shaders/rock/vertex.vert';
import fragmentShader from './shaders/rock/fragment.frag';

export function createRockMaterial(): THREE.ShaderMaterial {

    const material = new THREE.ShaderMaterial({

        uniforms: {

        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,

    });
    return material;
}