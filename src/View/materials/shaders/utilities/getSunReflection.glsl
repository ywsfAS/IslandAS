float getSunReflection(vec3 surfaceNormal,vec3 lightDirection,float intensity){

    float diffuse = max(dot(normalize(lightDirection), normalize(surfaceNormal)), 0.0);
    float brightness = 0.6 + diffuse * min(intensity * 0.13, 0.65);

    return brightness;
}