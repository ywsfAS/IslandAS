attribute float aSection;
varying vec3 vColor;

uniform vec3 uCylindreColor;
uniform vec3 uLowConeColor;
uniform vec3 uTopConeColor;

uniform vec3 uLightDirection;
uniform vec3 uSunColor;
uniform float uSunIntensity;

#include "../utilities/getSunReflection.glsl";
void main(){

    vec4 modelPosition = modelMatrix * instanceMatrix * vec4(position ,1.0);
    vec3 vNormal = normalize(mat3(modelMatrix * instanceMatrix) * normal);


    vec3 sectionColor = uTopConeColor;

    if (aSection < 0.5) {
        sectionColor = uCylindreColor;
    } else if (aSection < 1.5) {
        sectionColor = uLowConeColor;
    }else {
        sectionColor = uTopConeColor;
    }

    vec3 darkColor = sectionColor * 0.6;
    vec3 lightColor = sectionColor * 2.0;

    vec3 lightDirection = normalize(uLightDirection);
    vec3 normal = normalize(vNormal);

    float daylight = smoothstep(-0.1, 0.35, lightDirection.y);

    vec3 color = mix(darkColor,sectionColor,daylight);

    float diffuse = getSunReflection(normal,uLightDirection,uSunIntensity);
    
    vec3 finalColor = mix(color,lightColor,diffuse);

    float ambient = 0.35 + daylight * 0.2;
    float sunStrength = clamp(uSunIntensity / 5.0, 0.0, 1.0);

    float directLight = diffuse * daylight * sunStrength;

    finalColor *= directLight;

    vColor = finalColor;

    gl_Position = projectionMatrix * viewMatrix * modelPosition;

}