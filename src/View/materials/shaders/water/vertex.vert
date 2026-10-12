uniform float uTime;
uniform vec3 uAngularFrequency;
uniform vec3 uSpatialFrequency;
uniform vec3 uWaveAmplitude;
uniform vec3 uDirectionLight;
uniform vec3 uSunColor;
uniform float uSunIntensity;
uniform vec3 uCameraPosition;
uniform vec2 uDirection1;
uniform vec2 uDirection2;
uniform vec2 uDirection3;

varying vec3 vColor;

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

    float diffuse = max(dot(normal, normalize(uDirectionLight)), 0.0);
    float sunlight = 0.55 + diffuse * 0.2;

    vec3 darkWater = vec3(0.027, 0.337, 0.420);
    vec3 lightWater = vec3(0.259, 0.776, 0.769);
    float lightFactor = smoothstep(0.0, 0.9, sunlight);
    vec3 color = mix(darkWater, lightWater, lightFactor);

    vec3 viewDirection = normalize(uCameraPosition - modelPosition.xyz);
    float nDotV = max(dot(normal, viewDirection), 0.0);
    float fresnel = 0.02 + 0.98 * pow(1.0 - nDotV, 5.0);

    vec3 horizonColor = vec3(0.72, 0.85, 0.92);
    vec3 skyColor = vec3(0.18, 0.45, 0.72);
    float skyFactor = smoothstep(-0.15, 0.65, viewDirection.y);
    vec3 reflectedColor = mix(horizonColor, skyColor, skyFactor);

    vec3 finalColor = mix(color, reflectedColor, fresnel);
    vColor = finalColor * uSunColor * lightFactor;

    gl_Position = projectionMatrix * viewMatrix * modelPosition;
}