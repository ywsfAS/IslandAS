import * as THREE from 'three';
import vertexShader from './shaders/bush/vertex.vert';
import fragmentShader from './shaders/bush/fragment.frag';

export interface BushMaterialParams {
    radius: number;
    deepColor: string;
    standardColor: string;
    lightColor: string;
}

export function createBushMaterial(params: BushMaterialParams): THREE.ShaderMaterial {
    return new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
            uLightDirection: { value: new THREE.Vector3(0, 1, 0) },
            uSunIntensity: { value: 0 },
            uSunColor: { value: new THREE.Vector3(1, 1, 1) },
            uBushRadius: { value: params.radius },
            uDeepColor: { value: new THREE.Color(params.deepColor) },
            uStandardColor: { value: new THREE.Color(params.standardColor) },
            uLightColor: { value: new THREE.Color(params.lightColor) },
        },
    });
}