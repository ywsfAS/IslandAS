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
    if (terrainOffset.x < - 0.5 && terrainOffset.y <  0.0 ) {
        discard;
    }

    float waterDistance = length(max(terrainOffset, vec2(0.0)));
    float shoreMask = 1.0 - smoothstep(15.0, 25.0, waterDistance);

    vec3 shoreColor = vec3(0.035, 0.48, 0.52);
    vec3 deepColor = vec3(0.012, 0.10, 0.25);
    float depthBlend = smoothstep(1.5, 16.0, waterDistance);
    vec3 color = mix(shoreColor, deepColor, depthBlend);
    color *= 0.88 + diffuse * 0.18;

    float progress = mod(uTime * 0.48, 1.0);
    float rippleIndex = floor(uTime * 0.48);
    float ripplePhase = fract(waterDistance / 5.2 + progress);
    float ringDistance = min(ripplePhase, 1.0 - ripplePhase);
    float ring = 1.0 - smoothstep(0.035, 0.05, ringDistance);

    vec2 noiseUv = vUv * 4.0
        + vec2(uTime * 0.025, -uTime * 0.018)
        + rippleIndex * vec2(0.471, 0.519);
    float panningNoise = texture2D(uNoiseTexture, noiseUv).r;
    float secondNoise = texture2D(uNoiseTexture, noiseUv * 0.57 - vec2(uTime * 0.012, uTime * 0.02)).r;
    float noisySurface = panningNoise * 0.88 + secondNoise * 0.62;

    float surfaceBands = sin(noisySurface * 31.0 - uTime * 1.25);
    float surfaceRipples = smoothstep(0.68, 0.96, surfaceBands) * smoothstep(0.2, 0.92, noisySurface);
    float brokenShoreRings = ring * smoothstep(0.28, 0.7, noisySurface) * shoreMask;
    color += vec3(0.045, 0.19, 0.25) * surfaceRipples * 0.42;
    color += vec3(1.12, 1.39, 1.44) * brokenShoreRings * 0.72;

    float shorelineFoam = 1.0 - smoothstep(0.035, 0.24, waterDistance);
    color = mix(color, vec3(0.22, 0.72, 0.74), shorelineFoam * 0.42);

    float fresnel = 0.025 + 0.28 * pow(1.0 - max(dot(normal, viewDirection), 0.0), 5.0);
    vec3 skyReflection = mix(vec3(0.20, 0.42, 0.54), vec3(0.48, 0.70, 0.72), max(viewDirection.y, 0.0));
    color = mix(color, skyReflection, fresnel);

    vec3 reflectedSun = reflect(-sunDirection, normal);
    float sunGlint = pow(max(dot(reflectedSun, viewDirection), 0.0), 5.0);
    color += uSunColor * sunGlint * (0.12 + diffuse * 0.3) * clamp(uSunIntensity, 0.0, 1.0);

    gl_FragColor = vec4(color, 1.0);
}
