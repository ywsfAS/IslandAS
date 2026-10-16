attribute float aRandom;
void main() {

    vec4 randomPosition = aRandom * vec4(position,1.0);
    vec4 modelPosition = instanceMatrix * modelMatrix * randomPosition ;

    gl_Position = projectionMatrix * viewMatrix * modelPosition; 
}