import SimplexNoise from './noise.js';

interface WaterNoiseRequest {
    width: number;
    height: number;
    noiseScale: number;
}

const simplexNoise = new SimplexNoise();

onmessage = (event: MessageEvent<WaterNoiseRequest>) => {
    const { width, height, noiseScale } = event.data;
    const buffer = new ArrayBuffer(width * height);
    const data = new Uint8Array(buffer);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const noise = simplexNoise.noise2D(x * noiseScale, y * noiseScale);
            data[y * width + x] = Math.round((noise * 0.5 + 0.5) * 255);
        }
    }

    postMessage({ width, height, buffer }, { transfer: [buffer] });
};
