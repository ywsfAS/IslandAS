uniform vec3 uLightDirection;
uniform float uSunIntensity;
uniform vec3 uSunColor;

uniform vec3 uDeepColor;
uniform vec3 uStandardColor;
uniform vec3 uLightColor;

varying vec3 vWorldNormal;
varying vec2 vUv;
varying float vTone;
varying float vDepth;
varying float vNormalizedHeight;

#include "../utilities/getSunReflection.glsl";

void main() {
    float leafHalfWidth = pow(sin(vUv.y * 3.14159265), 0.65);
    float distanceFromMidrib = abs(vUv.x - 0.5) * 2.0;
    if (distanceFromMidrib > leafHalfWidth) discard;

    vec3 normal = normalize(vWorldNormal);
    vec3 lightDirection = normalize(uLightDirection);

    float daylight = smoothstep(-0.1, 0.35, lightDirection.y);

    float lighting = smoothstep(0.0,1.0,clamp(getSunReflection(normal,lightDirection,uSunIntensity),0.0,1.0) - 0.5);
    lighting = clamp(lighting + (vTone - 0.5) * 0.3, 0.0, 1.0);

    vec3 color = mix(uDeepColor, uStandardColor, smoothstep(0.0, 0.55, lighting));
    color = mix(color, uLightColor, smoothstep(0.55, 1.0, lighting));

    color *= mix(0.8, 1.0, smoothstep(0.0, 0.1, distanceFromMidrib));
    color *= mix(0.85, 1.1, vUv.y);

    float depthFactor = smoothstep(0.25, 0.95, vDepth);
    float heightFactor = smoothstep(-0.2, 0.5, vNormalizedHeight);
    float occlusion = mix(0.25, 1.0, depthFactor) * mix(0.5, 1.0, heightFactor);
    color = mix(uDeepColor * 0.7, color, occlusion);

    float sunStrength = clamp(uSunIntensity / 5.0, 0.0, 1.0);
    vec3 dayTint = mix(vec3(1.0), uSunColor, 0.35);
    color *= mix(vec3(0.55), dayTint, sunStrength * daylight);

    gl_FragColor = vec4(color, 1.0);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}