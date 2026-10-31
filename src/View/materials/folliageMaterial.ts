import {
    Color,
    DoubleSide,
    FrontSide,
    MeshStandardMaterial,
    Texture,
} from 'three';
import CustomShaderMaterial from 'three-custom-shader-material/vanilla';
import vertexShader from './shaders/folliage/vertex.vert';


export function createFoliageMaterial(alphaMap: Texture) {
    return new CustomShaderMaterial({
        baseMaterial: MeshStandardMaterial,

        vertexShader,

        uniforms: {
            u_effectBlend: { value: 4.0 },
            u_inflate: { value: 0.0 },
            u_scale: { value: 1.0 },
        },

        alphaMap,
        alphaTest: 0.5,
        color: new Color('#66b334').convertLinearToSRGB(),

        flatShading: true,

        toneMapped: false,
        fog: false,

        side: DoubleSide,
        shadowSide: FrontSide,
    });
}