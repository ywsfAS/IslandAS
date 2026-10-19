float grassAttenuation(vec2 pos){
    float dist = (distance(uPlayerPosition.xz,pos) / (100.0));
    return 1.0 - smoothstep(0.15,0.7,dist);
}