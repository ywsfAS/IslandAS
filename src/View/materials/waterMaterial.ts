import * as THREE from 'three';
import vertexShader from './shaders/water/vertex.vert';
import fragementShader from './shaders/water/fragment.frag';

export function createWaterMaterial() {

    const material = new THREE.ShaderMaterial({

        uniforms: {
            uTime: { value: null },
            uSpatialFrequency: { value: null },
            uAngularFrequency: { value: null },
            uWaveAmplitude: { value: null }

        },
        vertexShader: vertexShader,
        fragmentShader: fragementShader,
        side: THREE.DoubleSide

    });

    return material;
}