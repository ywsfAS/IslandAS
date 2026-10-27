varying vec4 vModelPosition;
attribute float aSection;
varying float vSection;
varying vec3 vNormal;
void main(){

    vec4 modelPosition = modelMatrix * instanceMatrix * vec4(position ,1.0);
    vNormal = normalize(mat3(modelMatrix * instanceMatrix) * normal);

    vModelPosition = modelPosition;
    vSection = aSection;

    gl_Position = projectionMatrix * viewMatrix * modelPosition;

}