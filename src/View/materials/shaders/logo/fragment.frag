uniform vec3 uBaseColor;
uniform vec3 uLightDirection;
uniform vec3 uSunColor;
uniform float uSunIntensity;

varying vec3 vWorldNormal;

void main() {
    vec3 normal = normalize(vWorldNormal);
    if (!gl_FrontFacing) {
        normal = -normal;
    }

    vec3 lightDirection = normalize(uLightDirection);
    float daylight = smoothstep(-0.1, 0.25, lightDirection.y);
    float diffuse = max(dot(normal, lightDirection), 0.0);
    float sunStrength = clamp(uSunIntensity / 5.0, 0.0, 1.0);

    vec3 nightColor = uBaseColor * 0.48;
    vec3 daylightColor = uBaseColor * (0.72 + daylight * 0.18);
    vec3 lightColor = mix(vec3(0.68, 0.66, 0.62), uSunColor, 0.35);
    float reflection = diffuse * daylight * sunStrength * 0.5;

    vec3 finalColor = mix(nightColor, daylightColor, daylight);
    finalColor = mix(finalColor, lightColor, reflection);

    gl_FragColor = vec4(finalColor, 1.0);
}
