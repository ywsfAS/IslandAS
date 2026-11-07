varying vec3 vNormal;

#include <fog_pars_vertex>

void main() {

    vec4 modelPosition = modelMatrix * vec4(position,1.0);

    vNormal = normal;

    vec4 mvPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * mvPosition;
    #include <fog_vertex>
}