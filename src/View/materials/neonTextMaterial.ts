import * as THREE from 'three';
import vertexShader from './shaders/neon/vertex.vert';
import fragmentShader from './shaders/neon/fragment.frag';

export function createNeonMaterial() {

    const material = new THREE.ShaderMaterial({

        uniforms: {
            uLightDirection: { value: null },
            uViewPosition: { value: new THREE.Vector3(0, 0, 0) },
            uTime: { value: null }
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader

    });
    return material;
}