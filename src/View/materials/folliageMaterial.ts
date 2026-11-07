import {
    Color,
    DoubleSide,
    FrontSide,
    MeshStandardMaterial,
    Texture,
} from 'three';
import CustomShaderMaterial from 'three-custom-shader-material/vanilla';
import vertexShader from './shaders/folliage/vertex.vert';


export function createFoliageMaterial(alphaMap: Texture, color: string = '#66b334') {
    return new CustomShaderMaterial({
        baseMaterial: MeshStandardMaterial,

        vertexShader,

        uniforms: {
            u_effectBlend: { value: 4.0 },
            u_inflate: { value: 0.0 },
            u_scale: { value: 1.0 },
            uTime: { value: null }
        },

        alphaMap,
        alphaTest: 0.5,
        color: new Color(color).convertLinearToSRGB(),

        flatShading: true,

        toneMapped: false,
        fog: true,

        side: DoubleSide,
        shadowSide: FrontSide,
    });
}