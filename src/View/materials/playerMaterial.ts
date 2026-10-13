import * as THREE from 'three';
import vertexShader from './shaders/player/vertex.vert';
import fragementShader from './shaders/player/fragement.frag';

export function createPlayerMaterial() {
    const material = new THREE.ShaderMaterial({
        uniforms: {
            uTime : {value : null},
            uSunColor : {value : null},
            uSunIntensity : {value : null},
            uLightDirection : {value : null}

        },
        vertexShader: vertexShader,
        fragmentShader: fragementShader

    });

    return material;
}