attribute float aRandom;
varying vec3 vNormal;

#include <fog_pars_vertex>

void main() {

    vec4 instancePosition = vec4(position * aRandom, 1.0);
    vec4 worldPosition = modelMatrix * instanceMatrix * instancePosition;

    vNormal = normalize(mat3(modelMatrix * instanceMatrix) * normal);
    vec4 mvPosition = viewMatrix * worldPosition;
    gl_Position = projectionMatrix * mvPosition;
    #include <fog_vertex>
}