uniform vec3 uColor;
uniform vec3 uEdgeColor;
uniform float uEdgeSoftness;

varying vec2 vUv;

void main() {

    float across = abs(vUv.x - 0.5) * 2.0;

    float alpha = 1.0 - smoothstep(1.0 - uEdgeSoftness, 1.0, across);

    vec3 color = mix(uColor, uEdgeColor, smoothstep(0.4, 1.0, across));

    gl_FragColor = vec4(color, alpha);
}