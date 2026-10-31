import * as THREE from 'three';
import vertexShader from './shaders/tree/vertex.vert';
import fragmentShader from './shaders/tree/fragment.frag';


export function createTreeViewMaterial() {
    const material = new THREE.ShaderMaterial({
        uniforms: {

        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader


    });

    return material;
}
