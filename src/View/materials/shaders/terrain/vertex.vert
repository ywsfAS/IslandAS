uniform vec3 uPlayerPosition;
uniform vec3 uDirectionLight;
uniform vec3 uSunColor;
uniform float uSunIntensity;
uniform float uGrassDistance;

varying vec3 vColor;

#include "../utilities/grassAttenuation.glsl";

void main(){
    
    vec4 modelPosition = modelMatrix * vec4(position,1.0);

    vec3 lightDirection = normalize(uDirectionLight);
    vec3 worldNormal = normalize(mat3(modelMatrix[0].xyz,modelMatrix[1].xyz,modelMatrix[2].xyz) * normal);
    float slope = 1.0 - max(dot(vec3(0.0, 1.0, 0.0), worldNormal), 0.0);

    vec3 defaultColor = vec3(0.52, 0.65, 0.26) / 1.2;
    vec3 shadedColor  = defaultColor / 2.5;
    float grassAtt = grassAttenuation(modelPosition.xz)
                   * (1.0 - smoothstep(0.4, 0.5, slope));
    vec3 color = mix(defaultColor, shadedColor, grassAtt);


    vec3 sunDir = normalize(uDirectionLight);
    float ndl = dot(worldNormal, sunDir);
    float shade = smoothstep(-0.2, 0.8, ndl);
    vec3 shadowTint = vec3(0.35, 0.65, 0.55) / 1.4;
    color = mix(color * shadowTint, color, shade);

    // Soft fresnel sheen
    vec3 viewDir = normalize(modelPosition.xyz - cameraPosition);
    float fresnel = pow(1.0 + dot(viewDir, worldNormal), 3.0);
    color += fresnel * 0.08 * shade;


    vColor = color;

    gl_Position = projectionMatrix * viewMatrix * modelPosition;
}