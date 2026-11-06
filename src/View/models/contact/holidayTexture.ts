import * as THREE from "three";

export const holidayTexture = new THREE.TextureLoader().load("/textures/colormap-holiday.png", texture => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.flipY = false;
});
