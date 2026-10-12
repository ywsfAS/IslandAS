import * as THREE from 'three';
import vertexShader from './shaders/sky/vertex.vert';
import fragmentShader from './shaders/sky/fragment.frag';

export function createSkyMaterial() {
    return new THREE.ShaderMaterial({
        uniforms: {
            uSunDirection: { value: new THREE.Vector3(0, 1, 0) }
        },
        vertexShader,
        fragmentShader,
        side: THREE.BackSide,
        depthWrite: false,
        depthTest: false
    });
}
