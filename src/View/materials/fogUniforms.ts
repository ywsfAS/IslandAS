import { UniformsLib, UniformsUtils } from 'three';

export function createFogUniforms() {
    return UniformsUtils.clone(UniformsLib.fog);
}
