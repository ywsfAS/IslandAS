uniform vec3 uLightDirection;
uniform float uSunIntensity;
uniform vec3 uSunColor;
uniform float uTime;

varying vec3 vNormal;

void main() {

    vec4 modelPosition = modelMatrix * vec4(position,1.0);



    vNormal = normal;

    gl_Position = projectionMatrix * viewMatrix * modelPosition;
}