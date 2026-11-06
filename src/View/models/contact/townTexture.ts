import * as THREE from "three";

export const townTexture = new THREE.TextureLoader().load("/textures/colormap-town.png", texture => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.flipY = false;
});
