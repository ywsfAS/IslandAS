import { DoubleSide, ShaderMaterial } from "three";
import vertexShader from './shaders/terrain/vertex.vert';
import fragementShader from './shaders/terrain/fragment.frag';

export default function createTerrainMaterial(): ShaderMaterial {


    const material = new ShaderMaterial({

        uniforms: {
            uTime: { value: null },
            uHeightMap: { value: null }
        },
        vertexShader: vertexShader,
        fragmentShader: fragementShader,
        side: DoubleSide
    })

    return material;

}
