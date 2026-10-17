import * as THREE from 'three';
import vertexShader from './shaders/logo/vertex.vert';
import fragmentShader from './shaders/logo/fragment.frag';

export function createLogoMaterial(baseColor: THREE.ColorRepresentation): THREE.ShaderMaterial {
    return new THREE.ShaderMaterial({
        uniforms: {
            uBaseColor: { value: new THREE.Color(baseColor) },
            uLightDirection: { value: new THREE.Vector3() },
            uSunColor: { value: new THREE.Color(0xffffff) },
            uSunIntensity: { value: 0 },
        },
        vertexShader,
        fragmentShader,
        side: THREE.DoubleSide,
    });
}
