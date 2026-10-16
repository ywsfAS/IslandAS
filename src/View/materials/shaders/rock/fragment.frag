uniform vec3 uLightDirection;
uniform vec3 uSunColor;
uniform float uSunIntensity;

varying vec3 vNormal;

void main(){

    vec3 lightDirection = normalize(uLightDirection);
    float daylight = smoothstep(-0.1, 0.35, lightDirection.y);

    vec3 lightColor = mix(vec3(0.68, 0.66, 0.62), uSunColor, 0.35);
    vec3 normalColor = vec3(0.45, 0.44, 0.42);
    vec3 darkColor = vec3(0.22, 0.21, 0.20);

    vec3 color = mix(normalColor,darkColor,daylight);

    float diffuse = max(dot(lightDirection, normalize(vNormal)), 0.0);

    float reflection = (0.3 + diffuse * 0.5) * daylight * clamp(uSunIntensity / 5.0, 0.0, 1.0);
    float ambient = 0.45 + daylight * 0.15;

    vec3 finalColor = mix(color * ambient, lightColor, reflection);


    gl_FragColor = vec4(finalColor,1.0);
}