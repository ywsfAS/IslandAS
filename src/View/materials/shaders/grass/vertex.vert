uniform float uGrassDistance;
uniform vec3 uPlayerPosition;
uniform vec3 uCameraPosition;
uniform sampler2D uHeightMap;

attribute vec2 center;

#include "../utilities/pivot.glsl";

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

    gl_Position = projectionMatrix * viewMatrix * worldPosition;
}