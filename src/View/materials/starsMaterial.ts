import * as THREE from 'three';
import vertexShader from './shaders/stars/vertex.vert';
import fragmentShader from './shaders/stars/fragment.frag';

export function createStarsMaterial(): THREE.ShaderMaterial {
    const material = new THREE.ShaderMaterial({
        uniforms: {
            uStarBrightness: { value: 0.0 }
        },
        vertexShader,
        fragmentShader,
        transparent: true,
        depthTest: false,
        depthWrite: false,
        blending: THREE.AdditiveBlending

    });
    return material;
}