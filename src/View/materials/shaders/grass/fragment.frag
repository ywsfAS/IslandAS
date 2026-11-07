varying vec3 vColor;
#include <fog_pars_fragment>

void main(){
    gl_FragColor = vec4(vColor,1.0);
    #include <fog_fragment>
}