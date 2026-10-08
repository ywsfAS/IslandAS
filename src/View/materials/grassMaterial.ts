import * as THREE from 'three';
import vertexShader from './shaders/grass/vertex.vert';
import fragementShader from './shaders/grass/fragment.frag';

export default function createGrassMaterial() {

    const material = new THREE.ShaderMaterial({

        uniforms: {
            uTime: { value: null },
            uPlayerPosition: { value: null },
        },
        vertexShader: vertexShader,
        fragmentShader: fragementShader,
        side: THREE.DoubleSide,

    })

    return material;
}