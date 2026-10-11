uniform vec3 uColor;
varying vec3 vColor;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position,1.0);
    vColor = uColor;
    gl_Position = projectionMatrix * viewMatrix * modelPosition;
}