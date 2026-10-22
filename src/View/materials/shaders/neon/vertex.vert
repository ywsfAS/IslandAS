
varying vec3 vWorldPosition;
varying vec3 vWorldNormal;
void main(){

    vec4 modelPosition = modelMatrix * vec4(position,1.0);

    vWorldPosition = modelPosition.xyz;
    vWorldNormal = normalize(mat3(transpose(inverse(modelMatrix))) * normal);

    gl_Position = projectionMatrix * viewMatrix * modelPosition;
}