uniform vec3 uPlayerPosition;
uniform float uGrassDistance;
uniform float uTime;

varying vec3 vColor;

#include "../utilities/grassAttenuation.glsl";
void main(){
    
    vec4 spacePosition = modelMatrix * vec4(position,1.0);

    float slope = 1.0 - dot(vec3(0,1,0),normal);
    float slopeScale  = 1.0 - smoothstep(0.2,0.7,slope);

    float attenuation = grassAttenuation(spacePosition.xz);

    float result = attenuation * slopeScale;



    
    
    vec3 terrainLightColor = vec3(0.55, 0.78, 0.35);
    vec3 terrainDarkColor  = vec3(0.20, 0.38, 0.18);

    vec3 color = mix(terrainDarkColor,terrainLightColor,attenuation);

    vColor = color;




    gl_Position = projectionMatrix * viewMatrix * spacePosition;
}