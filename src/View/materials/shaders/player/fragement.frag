uniform vec3 uLightDirection;
uniform float uSunIntensity;
uniform vec3 uSunColor;
uniform float uTime;
varying vec3 vNormal;

void main(){
    
    float time = 0.5 + 0.5 * cos(uTime * 3.14);
    vec3 lightColor      = vec3(0.20, 0.72, 0.78); // Light turquoise
    vec3 darkColor       = vec3(0.015, 0.12, 0.22); // Deep ocean blue
    vec3 reflectionColor = vec3(0.75, 0.92, 1.00); // Pale icy blue

    vec3 color = mix(lightColor,darkColor,time);

    float diffuse = 0.4 + abs(dot(normalize(uLightDirection),vNormal));
    vec3 reflectedColor = mix(color,reflectionColor,diffuse);
    
    gl_FragColor = vec4(reflectedColor, 1.0);
}