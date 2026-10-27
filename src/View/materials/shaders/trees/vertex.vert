varying vec4 vModelPosition;
attribute float aSection;
varying float vSection;
void main(){
    vec4 modelPosition = modelMatrix * instanceMatrix * vec4(position ,1.0);


    vModelPosition = modelPosition;
    vSection = aSection;
    gl_Position = projectionMatrix * viewMatrix * modelPosition;
}