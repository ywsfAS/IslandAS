import * as THREE from 'three';
import vertexShader from './shaders/ring/vertex.vert';
import fragmentShader from './shaders/ring/fragment.frag';
import CustomShaderMaterial from 'three-custom-shader-material/vanilla';


export function createRingMaterial() {

    const material = new CustomShaderMaterial({

        baseMaterial: THREE.MeshStandardMaterial,
        uniforms: {
            uSegments: { value: null },
            uProgress: { value: null },
            uTime: { value: null },
            uIdleColor: { value: new THREE.Vector4(0, 0, 0, 1.0) },
            uColorA: { value: new THREE.Vector4(0.0, 0.0, 0.0, 0.0) },
            uColorB: { value: new THREE.Vector4(0.08, 0.65, 1.0, 1.0) },
            uEmissive: { value: 5.5 },
        },
        vertexShader,
        fragmentShader,
        side: THREE.DoubleSide,
        transparent: true,
        depthWrite: false,
        toneMapped: false,

    });

    return material;
}