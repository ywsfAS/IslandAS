import * as THREE from "three";

interface SignpostLabel {
    text: string;
    y: number;
    rotation: number;
}

const createLabelMaterial = (text: string): THREE.MeshBasicMaterial => {
    const canvas = document.createElement("canvas");
    canvas.width = 2048;
    canvas.height = 512;

    const context = canvas.getContext("2d");
    if (!context) {
        throw new Error("Unable to create signpost label canvas context");
    }

    const drawLabel = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.font = '700 320px "Nunito", sans-serif';
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.lineWidth = 1;
        context.fillStyle = "#ffffff";
        context.strokeText(text, canvas.width / 2, canvas.height / 2, canvas.width - 48);
        context.fillText(text, canvas.width / 2, canvas.height / 2, canvas.width - 48);
    };

    drawLabel();

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 20;
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    void document.fonts.ready.then(() => {
        drawLabel();
        texture.needsUpdate = true;
    });

    return new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        depthWrite: false,
        polygonOffset: true,
        polygonOffsetFactor: -1,
        toneMapped: false,
    });
};

export const createSignpostLabels = (labels: SignpostLabel[]): THREE.Group => {
    const group = new THREE.Group();
    group.name = "signpost-labels";

    for (const { text, y, rotation } of labels) {
        const material = createLabelMaterial(text);
        const geometry = new THREE.PlaneGeometry(0.17, 0.04);
        const front = new THREE.Mesh(geometry, material);
        front.name = `signpost-label-${text.toLowerCase()}`;
        front.position.set(0, y, 0.0258);
        front.rotation.z = rotation;
        group.add(front);
    }

    return group;
};
