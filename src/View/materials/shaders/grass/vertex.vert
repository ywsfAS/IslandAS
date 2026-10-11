uniform float uGrassDistance;
uniform float uHeightMapTexelSize;
uniform vec3 uDirectionLight;
uniform vec3 uSunColor;
uniform float uSunIntensity;
uniform vec3 uPlayerPosition;
uniform vec3 uCameraPosition;
uniform sampler2D uHeightMap;
uniform float uTime;

attribute vec2 center;
varying vec3 vColor;
varying float vDebugValue;

#include "../utilities/pivot.glsl";
#include "../utilities/grassAttenuation.glsl";

void main()
{
    vec2 relativeCenter = center;
    relativeCenter -= uPlayerPosition.xz;
    
    float halfSize = uGrassDistance * 0.5;

    // wrap it in range (-half,half) around the player
    relativeCenter.x = mod(relativeCenter.x + halfSize,uGrassDistance) - halfSize;
    relativeCenter.y = mod(relativeCenter.y + halfSize,uGrassDistance) - halfSize;

    vec4 spaceCenter = modelMatrix * vec4(relativeCenter.x , 0.0 , relativeCenter.y ,1.0);

    vec2 terrainUV = (spaceCenter.xz + uGrassDistance * 0.5) / uGrassDistance;
    float height = texture2D(uHeightMap,terrainUV).r;

    spaceCenter.y += height;

    vec4 worldPosition = modelMatrix * vec4(position,1.0);

    float angle = atan(uCameraPosition.x - spaceCenter.x,uCameraPosition.z - spaceCenter.z);
    vec2 rotatedOffset = pivot2D(worldPosition.xz,angle,vec2(0.0));
    

    worldPosition.xz = rotatedOffset + spaceCenter.xz;
    worldPosition.y += height;

    float leftHeight = texture2D(uHeightMap,terrainUV - vec2(uHeightMapTexelSize,0.0)).r;
    float rightHeight = texture2D(uHeightMap,terrainUV + vec2(uHeightMapTexelSize,0.0)).r;
    float forwardHeight = texture2D(uHeightMap,terrainUV + vec2(0.0,uHeightMapTexelSize)).r;
    float backwardHeight = texture2D(uHeightMap,terrainUV - vec2(0.0,uHeightMapTexelSize)).r;

    vec3 terrainNormal = normalize(vec3(
        leftHeight - rightHeight,
        2.0 * uGrassDistance + uHeightMapTexelSize,
        forwardHeight - backwardHeight
    ));
    float slope = 1.0 - abs(terrainNormal.y);

    // attenuation = 0 means too far
    float attenuation = grassAttenuation(spaceCenter.xz);
    float slopeScale = 1.0 - smoothstep(0.4,0.5,slope);

    float scale = slopeScale * attenuation;
    float isPeak = step(2.0,mod(float(gl_VertexID) + 1.0,3.0));

    vec3 grassLightColor = vec3(0.52, 0.65, 0.26);
    vec3 grassDarkColor  = vec3(0.30, 0.40, 0.12);


    // wind effect 
    float wind = sin(uTime * 2.0 + worldPosition.x * 0.5 + worldPosition.z * 0.5) * 0.2;
    worldPosition.x += wind * position.y;

    vec3 color1 = mix(grassDarkColor,grassLightColor,scale);
    vec3 color2 = mix(color1,grassDarkColor,isPeak);

    float diffuse = max(dot(normalize(uDirectionLight), normalize(terrainNormal)), 0.0);
    float brightness = 0.6 + diffuse * min(uSunIntensity * 0.13, 0.65);


    vColor = color2 * brightness * uSunColor;

    // hide distant or high slop places blades
    worldPosition.xyz = mix(spaceCenter.xyz,worldPosition.xyz,scale);





    gl_Position = projectionMatrix * viewMatrix * worldPosition;
}