
varying vec3 vWorldNormal;
varying vec3 vWorldPosition;

uniform vec3 uLightDirection;
uniform vec3 uViewPosition;
uniform float uTime;

const float LASER_SPEED     = 0.45;  
const float LASER_SPACING   = 0.4;   
const float LASER_CORE_SIZE = 0.3;
const float LASER_GLOW_SIZE = 1.12;

const vec3 COLOR_BASE  = vec3(0.05, 0.45, 0.95);
const vec3 COLOR_RIM   = vec3(0.55, 1.00, 1.00);
const vec3 COLOR_GLOW  = vec3(0.30, 1.00, 0.95);
const vec3 COLOR_CORE  = vec3(0.45, 0.78, 1.00);

float distanceToLaser(vec3 position) {
    float diagonalCoord = (position.x + position.y) * 0.7071 * LASER_SPACING;
    float cell = fract(diagonalCoord - uTime * LASER_SPEED);
    return abs(cell - 0.5) / LASER_SPACING;
}

void main() {
    vec3 position = vWorldPosition ; 
    vec3 normal   = normalize(vWorldNormal);
    vec3 viewDir  = normalize(uViewPosition - vWorldPosition);
    vec3 lightDir = normalize(uLightDirection);

    float rim   = pow(1.0 - max(dot(viewDir, normal), 0.0), 2.0);
    float sheen = pow(max(dot(normal, lightDir), 0.0), 3.0);

    vec3 baseColor = mix(COLOR_BASE, COLOR_RIM, rim * 0.7 + sheen * 0.3);

    float dist = distanceToLaser(position);
    float glow = exp(-dist / LASER_GLOW_SIZE);
    float core = smoothstep(LASER_CORE_SIZE, 0.0, dist);

    float reflectionBoost = 0.7 + 0.6 * (1.0 - rim) + 0.4 * sheen;

    vec3 laserColor = COLOR_GLOW * glow * 1.4;
    laserColor = mix(laserColor, COLOR_CORE * 2.0, core);
    laserColor *= reflectionBoost;

    vec3 emission = baseColor + laserColor;
    emission = 1.0 - exp(-emission * 1.5);

    gl_FragColor = vec4(emission, 1.0);
}