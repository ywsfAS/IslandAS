varying vec3 vWorldNormal;

void main() {
    vWorldNormal = normalize(mat3(modelMatrix) * normal);

    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
