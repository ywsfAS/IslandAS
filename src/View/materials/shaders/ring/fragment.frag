uniform float uSegments;
uniform float uProgress;
uniform float uTime;
uniform float uEmissive;
uniform vec4 uIdleColor;
uniform vec4 uColorA;
uniform vec4 uColorB;

varying float vSegment;

void main() {
    float lit = clamp(uProgress * uSegments - vSegment, 0.0, 1.0);

    float isEven = step(mod(vSegment, 2.0), 0.5);
    vec4 activeColor = mix(uColorB, uColorA, isEven);

    vec4 base = mix(uIdleColor, activeColor, lit);
    csm_DiffuseColor = base;

    csm_Emissive = activeColor.rgb * lit * uEmissive;

    csm_Roughness = mix(0.9, 0.1, lit);
}