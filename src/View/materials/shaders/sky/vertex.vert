varying vec3 vSkyDirection;

void main()
{
    vec3 worldDirection = normalize(mat3(modelMatrix) * position);
    vSkyDirection = worldDirection;
    vec4 clipPosition = projectionMatrix * vec4(mat3(viewMatrix) * worldDirection, 1.0);
    gl_Position = clipPosition.xyww;
}
