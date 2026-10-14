uniform vec3 uLightDirection;
uniform float uSunIntensity;
uniform vec3 uSunColor;
uniform float uTime;
varying vec3 vNormal;

void main(){
    
    vec3 lightColor      = vec3(0.24, 0.68, 0.76); // Soft teal
    vec3 darkColor       = vec3(0.025, 0.10, 0.19); // Deep blue
    vec3 reflectionColor = vec3(0.82, 0.93, 0.98); // Cool soft highlight

    vec3 color = mix(lightColor, darkColor, 0.2);

    float diffuse = abs(dot(normalize(uLightDirection), normalize(vNormal)));
    float daylight = smoothstep(-0.1, 0.25, normalize(uLightDirection).y);
    float reflection = (0.3 + diffuse * 0.5) * daylight;
    vec3 reflectedColor = mix(color, reflectionColor, reflection);
    vec3 finalColor = reflectedColor ;
    
    gl_FragColor = vec4(finalColor, 1.0);
}