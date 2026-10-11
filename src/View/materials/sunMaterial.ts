import * as THREE from 'three';
import vertexShader from './shaders/sun/vertex.vert';
import fragementShader from './shaders/sun/fragments.frag';

export function createSunMaterial() {

    const material = new THREE.ShaderMaterial({

        uniforms: {
            uTime: { value: null }

        },

        vertexShader: vertexShader,
        fragmentShader: fragementShader
    });

    return material;

}