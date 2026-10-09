import SimplexNoise from './noise.js';


const simplexNoise = new SimplexNoise();

const getElevation = (x: number, y: number, lacunarity: number, persistence: number, iterations: number, baseFrequency: number
    , baseAmplitude: number, power: number, iterationsOffsets: number[][]) => {
    let elevation = 0
    let frequency = baseFrequency
    let amplitude = 1
    let normalisation = 0

    for (let i = 0; i < iterations; i++) {
        const noise = simplexNoise.noise2D(x * frequency + iterationsOffsets[i][0], y * frequency + iterationsOffsets[i][1])
        elevation += noise * amplitude

        normalisation += amplitude
        amplitude *= persistence
        frequency *= lacunarity
    }

    elevation /= normalisation
    elevation = Math.pow(Math.abs(elevation), power) * Math.sign(elevation)
    elevation *= baseAmplitude

    return elevation
}

onmessage = (event) => {

    const id = event.data.id;
    const size = event.data.size;
    const center = event.data.center;
    const subdivisions = event.data.subdivisions;
    const lacunarity = event.data.lacunarity;
    const iterations = event.data.iterations;
    const persistence = event.data.persistence;
    const terrainOffsets = event.data.terrainOffsets;
    const frequency = event.data.frequency;
    const power = event.data.power;
    const baseEmplitude = event.data.baseEmplitude;
    console.log(baseEmplitude);

    const positions = [];

    // generates positions for each right top corner 
    for (let x = 0; x <= subdivisions; x++) {

        for (let z = 0; z <= subdivisions; z++) {

            const px = (x / subdivisions) * size + center[0];
            const pz = (z / subdivisions) * size + center[1];
            const py = getElevation(px, pz, lacunarity, persistence, iterations, frequency, baseEmplitude, power, terrainOffsets);

            positions.push(px, py, pz);
        }
    }
    console.log(positions);

    postMessage({

        id,
        positions

    });

}