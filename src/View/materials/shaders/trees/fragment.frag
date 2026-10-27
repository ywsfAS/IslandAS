varying vec4 vModelPosition;
varying float vSection;

uniform vec3 uCylindreColor;
uniform vec3 uLowConeColor;
uniform vec3 uTopConeColor;

void main(){

    vec4 position = vModelPosition;
    vec3 sectionColor = uTopConeColor;
    if (vSection < 0.5) {
        sectionColor = uCylindreColor;
    } else if (vSection < 1.5) {
        sectionColor = uLowConeColor;
    }


    gl_FragColor = vec4(sectionColor,1.0);
}