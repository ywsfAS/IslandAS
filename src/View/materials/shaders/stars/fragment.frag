uniform float uStarBrightness;

varying vec3 vColor;

void main(){
    float pointDistance = length(gl_PointCoord - vec2(0.5));
    float alpha = 1.0 - smoothstep(0.2, 0.5, pointDistance);
    gl_FragColor = vec4(vColor * uStarBrightness, alpha);
}