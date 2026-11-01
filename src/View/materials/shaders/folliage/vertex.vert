uniform float u_effectBlend;
uniform float u_inflate;
uniform float u_scale;
uniform float uTime;

float inverseLerp(float v, float minValue, float maxValue) {
  return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
  float t = inverseLerp(v, inMin, inMax);
  return mix(outMin, outMax, t);
}

vec2 calcInitialOffsetFromUVs() {
  vec2 offset = vec2(
    remap(uv.x, 0.0, 1.0, -1.0, 1.0),
    remap(uv.y, 0.0, 1.0, -1.0, 1.0)
  );

  offset *= vec2(-1.0, 1.0);
  offset = normalize(offset) * u_scale;

  return offset;
}

vec3 inflateOffset(vec3 offset) {
  return offset + normal.xyz * u_inflate;
}

void main() {

  vec4 modelPosition = instanceMatrix * vec4(position, 1.0);

  vec4 worldViewPosition = modelViewMatrix * modelPosition;
  vec4 treePosition = modelMatrix * instanceMatrix  * vec4(position,1.0);

  vec2 vertexOffset = calcInitialOffsetFromUVs();
  vec3 inflatedVertexOffset = inflateOffset(vec3(vertexOffset, 0.0));
  worldViewPosition += vec4(mix(vec3(0.0), inflatedVertexOffset, u_effectBlend), 0.0);

  csm_PositionRaw = projectionMatrix * worldViewPosition;
}
