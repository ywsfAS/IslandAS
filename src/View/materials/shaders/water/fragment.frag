uniform vec3 uDirectionLight;
uniform vec3 uSunColor;
uniform float uSunIntensity;
uniform vec3 uCameraPosition;
uniform float uTime;
uniform vec2 uTerrainCenter;
uniform float uTerrainSize;
uniform sampler2D uNoiseTexture;

varying vec3 vWorldPosition;
varying vec3 vWorldNormal;
varying vec2 vUv;

void main()
{
    vec3 normal = normalize(vWorldNormal);
    vec3 sunDirection = normalize(uDirectionLight);
    vec3 viewDirection = normalize(uCameraPosition - vWorldPosition);
    float diffuse = max(dot(normal, sunDirection), 0.0);

    vec2 terrainOffset = abs(vWorldPosition.xz - uTerrainCenter) - vec2(uTerrainSize * 0.5);
    if (terrainOffset.x < - 0.5 && terrainOffset.y < - 0.5 ) {
        discard;
    }

    float waterDistance = length(max(terrainOffset, vec2(0.0)));
    float shoreMask = 1.0 - smoothstep(11.0, 15.0, waterDistance);

    vec3 shoreColor = vec3(0.035, 0.48, 0.52);
    vec3 deepColor = vec3(0.012, 0.10, 0.25);
    float depthBlend = smoothstep(1.5, 16.0, waterDistance);
    vec3 color = mix(shoreColor, deepColor, depthBlend);
    color *= 0.88 + diffuse * 0.18;

    float progress = mod(uTime * 0.55, 1.0);
    float rippleIndex = floor(uTime * 0.55);
    float ripplePhase = fract(waterDistance / 2.6 + progress);
    float ringDistance = min(ripplePhase, 1.0 - ripplePhase);
    float ring = 1.0 - smoothstep(0.025, 0.09, ringDistance);

    vec2 noiseUv = vUv * 7.0
        + vec2(uTime * 0.018, -uTime * 0.012)
        + rippleIndex * vec2(0.371, 0.619);
    float panningNoise = texture2D(uNoiseTexture, noiseUv).r;
    float noiseCutout = smoothstep(0.32, 0.72, panningNoise);
    float ripple = ring * noiseCutout * shoreMask;

    float shorelineFoam = 1.0 - smoothstep(0.035, 0.24, waterDistance);
    color = mix(color, vec3(0.22, 0.72, 0.74), shorelineFoam * 0.42);
    color += vec3(0.18, 0.62, 0.72) * ripple * 0.52;

    float fresnel = 0.025 + 0.28 * pow(1.0 - max(dot(normal, viewDirection), 0.0), 5.0);
    vec3 skyReflection = mix(vec3(0.20, 0.42, 0.54), vec3(0.48, 0.70, 0.72), max(viewDirection.y, 0.0));
    color = mix(color, skyReflection, fresnel);

    vec3 reflectedSun = reflect(-sunDirection, normal);
    float sunGlint = pow(max(dot(reflectedSun, viewDirection), 0.0), 42.0);
    color += uSunColor * sunGlint * (0.12 + diffuse * 0.3) * clamp(uSunIntensity, 0.0, 1.0);

    gl_FragColor = vec4(color, 1.0);
}
