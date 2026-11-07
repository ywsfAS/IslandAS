uniform vec3 uSunDirection;

varying vec3 vSkyDirection;

void main()
{
    vec3 skyDirection = normalize(vSkyDirection);
    float elevation = clamp(skyDirection.y, -1.0, 1.0);
    float height = smoothstep(-0.08, 0.72, elevation);
    float sunHeight = uSunDirection.y;
    float daylight = smoothstep(-0.12, 0.22, sunHeight);
    float twilight = 1.0 - smoothstep(0.015, 0.38, abs(sunHeight));

    vec3 dayHorizon = vec3(0.78, 0.88, 1.0);
    vec3 dayMid = vec3(0.36, 0.63, 0.94);
    vec3 dayZenith = vec3(0.08, 0.25, 0.68);
    vec3 nightHorizon = vec3(0.10, 0.12, 0.27);
    vec3 nightZenith = vec3(0.012, 0.025, 0.10);
    vec3 twilightHorizon = vec3(1.0, 0.38, 0.16);
    vec3 twilightMid = vec3(1.0, 0.40, 0.62);
    vec3 twilightZenith = vec3(0.34, 0.24, 0.58);

    float upperSky = smoothstep(0.0, 0.62, height);
    vec3 dayColor = mix(dayHorizon, dayMid, upperSky);
    dayColor = mix(dayColor, dayZenith, smoothstep(0.35, 1.0, height));
    vec3 nightColor = mix(nightHorizon, nightZenith, height);
    vec3 twilightColor = mix(twilightHorizon, twilightMid, upperSky);
    twilightColor = mix(twilightColor, twilightZenith, smoothstep(0.35, 1.0, height));

    vec3 skyColor = mix(nightColor, dayColor, daylight);
    skyColor = mix(skyColor, twilightColor, twilight * 0.9);

    float horizonGlow = exp(-abs(elevation) * 9.0) * twilight;
    skyColor += vec3(1.0, 0.28, 0.42) * horizonGlow * 0.24;

    float sunAlignment = max(dot(skyDirection, normalize(uSunDirection)), 0.0);
    float sunGlow = pow(sunAlignment, 10.0) * (0.18 + twilight * 0.55);
    skyColor += mix(vec3(0.34, 0.52, 1.0), vec3(1.0, 0.34, 0.12), twilight) * sunGlow;

    gl_FragColor = vec4(skyColor, 1.0);
}
