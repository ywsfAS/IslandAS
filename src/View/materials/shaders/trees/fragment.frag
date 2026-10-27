varying vec4 vModelPosition;
varying float vSection;
varying vec3 vNormal;

uniform vec3 uCylindreColor;
uniform vec3 uLowConeColor;
uniform vec3 uTopConeColor;

uniform vec3 uLightDirection;
uniform vec3 uSunColor;
uniform float uSunIntensity;

void main() {
    vec3 sectionColor = uTopConeColor;

    if (vSection < 0.5) {
        sectionColor = uCylindreColor;
    } else if (vSection < 1.5) {
        sectionColor = uLowConeColor;
    }

    vec3 lightDirection = normalize(uLightDirection);
    vec3 normal = normalize(vNormal);

    float daylight = smoothstep(-0.1, 0.35, lightDirection.y);

    float diffuse = max(dot(normal, lightDirection), 0.0);

    float ambient = 0.35 + daylight * 0.2;
    float sunStrength = clamp(uSunIntensity / 5.0, 0.0, 1.0);

    float directLight = diffuse * daylight * sunStrength;

    vec3 lighting = vec3(ambient) + uSunColor * directLight * 0.7;

    vec3 finalColor = sectionColor * lighting;

    gl_FragColor = vec4(finalColor, 1.0);
}