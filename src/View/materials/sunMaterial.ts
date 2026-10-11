import * as THREE from 'three';
import vertexShader from './shaders/sun/vertex.vert';
import fragementShader from './shaders/sun/fragments.frag';

export function createSunMaterial() {

    const material = new THREE.ShaderMaterial({

        uniforms: {
            uColor: { value: new THREE.Color(0xfff0d0) }
        },

        vertexShader: vertexShader,
        fragmentShader: fragementShader
    });

    return material;

}