uniform vec3 uDirectionLight;
uniform vec3 uSunColor;
uniform float uSunIntensity;
uniform vec3 uCameraPosition;

varying vec3 vWorldPosition;
varying vec3 vWorldNormal;

void main()
{
    vec3 normal = normalize(vWorldNormal);
    float diffuse = max(dot(normal, normalize(uDirectionLight)), 0.0);
    float sunlight = 0.55 + diffuse * 0.2;

    vec3 darkWater = vec3(0.027, 0.337, 0.420);
    vec3 lightWater = vec3(0.259, 0.776, 0.769);
    float lightFactor = smoothstep(0.0, 0.9, sunlight);
    vec3 color = mix(darkWater, lightWater, lightFactor);

    vec3 viewDirection = normalize(uCameraPosition - vWorldPosition);
    float nDotV = max(dot(normal, viewDirection), 0.0);
    float fresnel = 0.02 + 0.98 * pow(1.0 - nDotV, 5.0);

    vec3 horizonColor = vec3(0.72, 0.85, 0.92);
    vec3 skyColor = vec3(0.18, 0.45, 0.72);
    float skyFactor = smoothstep(-0.15, 0.65, viewDirection.y);
    vec3 reflectedColor = mix(horizonColor, skyColor, skyFactor);

    vec3 finalColor = mix(color, reflectedColor, fresnel);
    gl_FragColor = vec4(finalColor * uSunColor * lightFactor, 1.0);
}