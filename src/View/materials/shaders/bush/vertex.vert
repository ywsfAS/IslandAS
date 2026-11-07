uniform float uBushRadius;

attribute float aTone;
attribute float aDepth;

varying vec3 vWorldNormal;
varying vec2 vUv;
varying float vTone;
varying float vDepth;
varying float vNormalizedHeight;

#include <fog_pars_vertex>

void main() {
    mat4 instanceTransform = modelMatrix * instanceMatrix;
    vec4 worldPosition = instanceTransform * vec4(position, 1.0);

    vWorldNormal = normalize(transpose(inverse(mat3(instanceTransform))) * normal);

    vUv = uv;
    vTone = aTone;
    vDepth = aDepth;

    vNormalizedHeight = position.y / uBushRadius;

    vec4 mvPosition = viewMatrix * worldPosition;
    gl_Position = projectionMatrix * mvPosition;
    #include <fog_vertex>
}
