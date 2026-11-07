import * as THREE from 'three';
import vertexShader from './shaders/player/vertex.vert';
import fragementShader from './shaders/player/fragement.frag';
import { createFogUniforms } from './fogUniforms';

export function createPlayerMaterial() {
    const material = new THREE.ShaderMaterial({
        uniforms: {
            ...createFogUniforms(),
            uTime : {value : null},
            uSunColor : {value : null},
            uSunIntensity : {value : null},
            uLightDirection : {value : null}

        },
        vertexShader: vertexShader,
        fragmentShader: fragementShader,
        fog: true

    });

    return material;
}