uniform vec3 uPlayerPosition;
uniform vec3 uDirectionLight;
uniform vec3 uSunColor;
uniform float uSunIntensity;
uniform float uGrassDistance;

varying vec3 vColor;

#include "../utilities/grassAttenuation.glsl";

void main(){
    
    vec4 spacePosition = modelMatrix * vec4(position,1.0);

    vec3 lightDirection = normalize(uDirectionLight);
    vec3 worldNormal = normalize(normalMatrix * normal);
    float slope = 1.0 - max(dot(vec3(0.0, 1.0, 0.0), worldNormal), 0.0);
    float slopeScale = 1.0 - smoothstep(0.2, 0.7, slope);
    float attenuation = grassAttenuation(spacePosition.xz);
    float terrainBlend = attenuation * slopeScale;

    float daylight = smoothstep(-0.1, 0.25, lightDirection.y) * clamp(uSunIntensity / 5.0, 0.0, 1.0);
    float diffuse = max(dot(worldNormal, lightDirection), 0.0) * daylight;
    float sunlight = 0.55 + daylight * 0.25 + diffuse * 0.2;

    vec3 terrainLightColor = vec3(0.55, 0.78, 0.35);
    vec3 terrainDarkColor  = vec3(0.20, 0.38, 0.18);

    vec3 terrainColor = mix(terrainDarkColor, terrainLightColor, terrainBlend);
    vColor = terrainColor * sunlight * uSunColor;

    gl_Position = projectionMatrix * viewMatrix * spacePosition;
}