uniform float uTime;
uniform vec3 uAngularFrequency;
uniform vec3 uSpatialFrequency;
uniform vec3 uWaveAmplitude;
uniform vec2 uDirection1;
uniform vec2 uDirection2;
uniform vec2 uDirection3;

varying vec3 vWorldPosition;
varying vec3 vWorldNormal;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    vec3 phase = uAngularFrequency * uTime;

    // heights waves functions
    float h1 = uWaveAmplitude.x * sin(uSpatialFrequency.x * dot(modelPosition.xz, uDirection1) + phase.x);
    float h2 = uWaveAmplitude.y * sin(uSpatialFrequency.y * dot(modelPosition.xz, uDirection2) + phase.y);
    float h3 = uWaveAmplitude.z * sin(uSpatialFrequency.z * dot(modelPosition.xz, uDirection3) + phase.z);

    float height = h1 + h2 + h3;
    modelPosition.y += height;

    // wave slopes
    float slope1x = uWaveAmplitude.x * uSpatialFrequency.x * uDirection1.x * cos(uSpatialFrequency.x * dot(modelPosition.xz, uDirection1) + phase.x);
    float slope1z = uWaveAmplitude.x * uSpatialFrequency.x * uDirection1.y * cos(uSpatialFrequency.x * dot(modelPosition.xz, uDirection1) + phase.x);

    float slope2x = uWaveAmplitude.y * uSpatialFrequency.y * uDirection2.x * cos(uSpatialFrequency.y * dot(modelPosition.xz, uDirection2) + phase.y);
    float slope2z = uWaveAmplitude.y * uSpatialFrequency.y * uDirection2.y * cos(uSpatialFrequency.y * dot(modelPosition.xz, uDirection2) + phase.y);

    float slope3x = uWaveAmplitude.z * uSpatialFrequency.z * uDirection3.x * cos(uSpatialFrequency.z * dot(modelPosition.xz, uDirection3) + phase.z);
    float slope3z = uWaveAmplitude.z * uSpatialFrequency.z * uDirection3.y * cos(uSpatialFrequency.z * dot(modelPosition.xz, uDirection3) + phase.z);

    vec3 normal1 = normalize(vec3(-slope1x, 1.0, -slope1z));
    vec3 normal2 = normalize(vec3(-slope2x, 1.0, -slope2z));
    vec3 normal3 = normalize(vec3(-slope3x, 1.0, -slope3z));
    vec3 normal = normalize(normal1 + normal2 + normal3);

    vWorldPosition = modelPosition.xyz;
    vWorldNormal = normal;

    gl_Position = projectionMatrix * viewMatrix * modelPosition;
}