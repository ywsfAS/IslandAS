import { DoubleSide, ShaderMaterial } from "three";
import vertexShader from './shaders/terrain/vertex.vert';
import fragementShader from './shaders/terrain/fragment.frag';
import { createFogUniforms } from './fogUniforms';

export default function createTerrainMaterial(): ShaderMaterial {


    const material = new ShaderMaterial({

        uniforms: {
            ...createFogUniforms(),
            uTime: { value: null },
            uHeightMap: { value: null },
            uPlayerPosition: { value: null },
            uGrassDistance: { value: null },
            uDirectionLight: { value: null },
            uSunIntensity: { value: null },
            uSunColor: { value: null },
            uDirections: { value: null }

        },
        vertexShader: vertexShader,
        fragmentShader: fragementShader,
        side: DoubleSide,
        fog: true
    })

    return material;

}
