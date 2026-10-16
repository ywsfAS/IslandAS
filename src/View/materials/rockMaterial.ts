import * as THREE from 'three';
import vertexShader from './shaders/rock/vertex.vert';
import fragmentShader from './shaders/rock/fragment.frag';

export function createRockMaterial(): THREE.ShaderMaterial {

    const material = new THREE.ShaderMaterial({

        uniforms: {
            uLightDirection : {value : null},
            uSunColor : {value : null},
            uSunIntensity : {value : null}

        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,

    });
    return material;
}