uniform vec3 uBaseColor;
uniform vec3 uLightDirection;
uniform vec3 uSunColor;
uniform float uSunIntensity;
uniform float uHover;
uniform vec3 uCameraPosition;
uniform vec3 uRimColor;

varying vec3 vWorldNormal;
varying vec3 vWorldPosition;

#include "../utilities/getSunReflection.glsl";

void main() {
    vec3 normal = normalize(vWorldNormal);
    if (!gl_FrontFacing) {
        normal = -normal;
    }

    vec3 lightDirection = normalize(uLightDirection);
    float daylight = smoothstep(-0.1, 0.25, lightDirection.y);

    vec3 nightColor = uBaseColor * 0.48;
    vec3 daylightColor = uBaseColor * (0.72 + daylight * 0.18);
    vec3 lightColor = mix(vec3(0.68, 0.66, 0.62), uSunColor, 0.35);
    float reflection = getSunReflection(normal,lightDirection,uSunIntensity);

    vec3 finalColor = mix(nightColor, daylightColor, daylight);
    finalColor = mix(finalColor, lightColor, reflection / 3.0);
    vec3 hoverColor = min(finalColor * 1.4 + vec3(0.08), vec3(1.0));
    finalColor = mix(finalColor, hoverColor, uHover);

    vec3 viewDirection = normalize(uCameraPosition - vWorldPosition);
    float rim = pow(1.0 - max(dot(normal, viewDirection), 0.0), 3.0);
    finalColor += uRimColor * rim * 0.35;

    gl_FragColor = vec4(finalColor, 1.0);
}
