attribute float aSize;
attribute vec3 aColor;

varying vec3 vColor;

void main(){
    vec4 modelPosition = modelMatrix * vec4(position,1.0);
    vec4 viewPosition = viewMatrix * modelPosition;

    gl_Position = projectionMatrix * viewPosition;
    gl_PointSize = aSize * (300.0 / -viewPosition.z);
    vColor = aColor;
}