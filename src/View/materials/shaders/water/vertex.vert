uniform float uTime;
uniform float uAngularFrequency;
uniform float uSpatialFrequency;
uniform float uWaveAmplitude;
void main()
{
    vec4 modelPosition = modelMatrix * vec4(position,1.0);

    modelPosition.y += uWaveAmplitude * sin(uSpatialFrequency * modelPosition.x + uAngularFrequency * uTime);

    gl_Position = projectionMatrix * viewMatrix * modelPosition;
}