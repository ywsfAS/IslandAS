import * as THREE from 'three';
import vertexShader from './shaders/trees/vertex.vert';
import fragmentShader from './shaders/trees/fragment.frag';

export function createTreeMaterial(): THREE.ShaderMaterial {

    const material = new THREE.ShaderMaterial({
        uniforms: {

        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,

    })

    return material;
}