import * as THREE from 'three';
import vertexShader from './shaders/water/vertex.vert';
import fragementShader from './shaders/water/fragment.frag';

export function createWaterMaterial() {

    const material = new THREE.ShaderMaterial({

        uniforms: {
            uTime: { value: null },
            uSpatialFrequency: { value: null },
            uAngularFrequency: { value: null },
            uWaveAmplitude: { value: null },
            uDirectionLight: { value: null },
            uSunIntensity: { value: null },
            uSunColor: { value: null },
            uCameraPosition: { value: null },
            uTerrainCenter: { value: null },
            uTerrainSize: { value: null },
            uNoiseTexture: { value: null },
            uDirection1: { value: null },
            uDirection2: { value: null },
            uDirection3: { value: null }
        },
        vertexShader: vertexShader,
        fragmentShader: fragementShader,
        side: THREE.DoubleSide

    });

    return material;
}