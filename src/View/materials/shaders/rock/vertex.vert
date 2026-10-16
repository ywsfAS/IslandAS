attribute float aRandom;
varying vec3 vNormal;

void main() {

    vec4 instancePosition = vec4(position * aRandom, 1.0);
    vec4 worldPosition = modelMatrix * instanceMatrix * instancePosition;

    vNormal = normalize(mat3(modelMatrix * instanceMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
}