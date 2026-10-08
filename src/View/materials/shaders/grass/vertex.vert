uniform float uGrassDistance;
uniform vec3 uPlayerPosition;
uniform vec3 uCameraPosition;
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

    vec4 worldPosition = modelMatrix * vec4(position,1.0);

    float angle = atan(spaceCenter.x - uCameraPosition.x,spaceCenter.z - uCameraPosition.z);
    worldPosition.xz = pivot2D(worldPosition.xz,angle,spaceCenter.xz);
    


    worldPosition.xz += relativeCenter;

    gl_Position = projectionMatrix * viewMatrix * worldPosition;
}