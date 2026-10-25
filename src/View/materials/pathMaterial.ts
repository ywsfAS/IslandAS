import * as THREE from 'three';
import fragmentShader from './shaders/path/fragment.frag';
import vertexShader from './shaders/path/vertex.vert';

export function createPathMaterial(): THREE.ShaderMaterial {
    return new THREE.ShaderMaterial({
        uniforms: {
            uColor: { value: new THREE.Color('#a58a63') },
            uEdgeColor: { value: new THREE.Color('#6f5d3f') },
            uEdgeSoftness: { value: 0.35 },
            uSunDirection: { value: new THREE.Vector3(0, 1, 0) },
            uSunColor: { value: new THREE.Color(1, 1, 1) },
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
    });
}