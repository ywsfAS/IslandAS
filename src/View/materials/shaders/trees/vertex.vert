void main(){
    vec4 modelPosition = modelMatrix * instanceMatrix * vec4(position ,1.0);
    gl_Position = projectionMatrix * viewMatrix * modelPosition;
}