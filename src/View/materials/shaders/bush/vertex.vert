uniform float uBushRadius;

attribute float aTone;
attribute float aDepth;

varying vec3 vWorldNormal;
varying vec2 vUv;
varying float vTone;
varying float vDepth;
varying float vNormalizedHeight;

void main() {
    mat4 instanceTransform = modelMatrix * instanceMatrix;
    vec4 worldPosition = instanceTransform * vec4(position, 1.0);

    vWorldNormal = normalize(transpose(inverse(mat3(instanceTransform))) * normal);

    vUv = uv;
    vTone = aTone;
    vDepth = aDepth;

    vNormalizedHeight = position.y / uBushRadius;

    gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
