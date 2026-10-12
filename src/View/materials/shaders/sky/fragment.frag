uniform vec3 uSunDirection;

varying vec3 vSkyDirection;

void main()
{
    vec3 skyDirection = normalize(vSkyDirection);
    float height = smoothstep(-0.12, 0.7, skyDirection.y);
    float sunHeight = uSunDirection.y;
    float daylight = smoothstep(-0.12, 0.16, sunHeight);
    float sunset = (1.0 - smoothstep(0.015, 0.28, abs(sunHeight))) * (1.0 - daylight * 0.35);

    vec3 dayHorizon = vec3(0.72, 0.84, 0.96);
    vec3 dayZenith = vec3(0.12, 0.38, 0.78);
    vec3 nightHorizon = vec3(0.055, 0.085, 0.19);
    vec3 nightZenith = vec3(0.008, 0.018, 0.065);
    vec3 sunsetHorizon = vec3(1.0, 0.34, 0.12);
    vec3 sunsetZenith = vec3(0.34, 0.20, 0.43);

    vec3 dayColor = mix(dayHorizon, dayZenith, height);
    vec3 nightColor = mix(nightHorizon, nightZenith, height);
    vec3 sunsetColor = mix(sunsetHorizon, sunsetZenith, height);
    vec3 skyColor = mix(nightColor, dayColor, daylight);
    skyColor = mix(skyColor, sunsetColor, sunset);

    float sunGlow = pow(max(dot(skyDirection, normalize(uSunDirection)), 0.0), 12.0) * sunset;
    skyColor += vec3(1.0, 0.38, 0.12) * sunGlow;

    gl_FragColor = vec4(skyColor, 1.0);
}
