varying vec3 vWorldNormal;
varying vec3 vWorldPosition;

#include <fog_pars_vertex>

void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    vWorldPosition = worldPosition.xyz;
    vec4 mvPosition = viewMatrix * worldPosition;
    gl_Position = projectionMatrix * mvPosition;
    #include <fog_vertex>
}
