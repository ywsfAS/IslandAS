uniform vec3 uPlayerPosition;
uniform vec3 uDirectionLight;
uniform vec3 uSunColor;
uniform float uSunIntensity;

uniform float uFresnelPower;
uniform float uFresnelOffset;

varying vec3 vColor;

#include <fog_pars_vertex>
#include "../utilities/grassAttenuation.glsl";
#include "../utilities/getSunReflection.glsl";

void main(){
    
    vec4 modelPosition = modelMatrix * vec4(position,1.0);

    vec4 mvPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * mvPosition;

    vec3 lightDirection = normalize(uDirectionLight);
    vec3 worldNormal = normalize(mat3(modelMatrix[0].xyz,modelMatrix[1].xyz,modelMatrix[2].xyz) * normal);
    float slope = 1.0 - max(dot(vec3(0.0, 1.0, 0.0), worldNormal), 0.0);

    vec3 defaultColor = vec3(0.52, 0.65, 0.26) /1.2;
    vec3 shadedColor  = defaultColor / 3.2;
    float grassAtt = grassAttenuation(modelPosition.xz)
                   * (1.0 - smoothstep(0.4, 0.5, slope));
    vec3 color = mix(defaultColor, shadedColor, grassAtt);


    vec3 sunDir = normalize(uDirectionLight);
    float brightness = getSunReflection(worldNormal,sunDir,uSunIntensity);
    color *= brightness;

    // Soft fresnel sheen
    vec3 viewDir = normalize(modelPosition.xyz - cameraPosition);
    float fresnel = pow(uFresnelOffset + dot(viewDir, worldNormal), uFresnelPower);
    color += uSunColor * fresnel * 0.25 ;


    vColor = color;

    #include <fog_vertex>
}