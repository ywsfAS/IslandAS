import type { TerrainEvent } from '../state/terrains/types.ts';
import SimplexNoise from './noise';

const getElevation = (x: number, y: number, lacunarity: number, persistence: number, iterations: number, baseFrequency: number
    , baseAmplitude: number, power: number, iterationsOffsets: number[][], seed: number): number => {
    let elevation = 0
    let frequency = baseFrequency
    let amplitude = 1
    let normalisation = 0

    const simplexNoise = new SimplexNoise(seed);

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

onmessage = (event: { data: TerrainEvent }) => {

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
    const verticalOffset = event.data.verticalOffset;
    const seed = event.data.seed;


    const h = (px: number, pz: number) =>
        getElevation(px, pz, lacunarity, persistence, iterations, frequency, baseEmplitude, power, terrainOffsets, seed) + verticalOffset;

    const positions = new Float32Array(Math.pow(subdivisions + 1, 2) * 3);

    // generates positions for each right top corner 
    for (let x = 0; x <= subdivisions; x++) {

        for (let z = 0; z <= subdivisions; z++) {

            const px = (x / subdivisions - 0.5) * size + center[0];
            const pz = (z / subdivisions - 0.5) * size + center[1];
            const py = h(px, pz);

            const index = (z * (subdivisions + 1) + x) * 3;

            positions[index] = px;
            positions[index + 1] = py;
            positions[index + 2] = pz;

        }
    }

    const cellsCount = subdivisions * subdivisions;
    const vertexCount = (subdivisions + 1) * (subdivisions + 1);

    const IndexArray = vertexCount <= 65536
        ? Uint16Array
        : Uint32Array;

    const indices = new IndexArray(cellsCount * 6);
    const segments = subdivisions + 1;

    for (let z = 0; z < subdivisions; z++) {
        for (let x = 0; x < subdivisions; x++) {
            const a = z * segments + x;
            const b = a + 1;
            const d = (z + 1) * segments + x;
            const c = d + 1;

            const index = (z * subdivisions + x) * 6;

            indices[index] = a;
            indices[index + 1] = d;
            indices[index + 2] = c;

            indices[index + 3] = a;
            indices[index + 4] = b;
            indices[index + 5] = c;
        }
    }


    const sample = 2;
    const resolution = subdivisions * sample + 1;
    const textures = new Float32Array(resolution * resolution);



    for (let x = 0; x < resolution; x++) {

        for (let z = 0; z < resolution; z++) {

            const px = center[0] + ((x / (resolution - 1)) - 0.5) * size;
            const pz = center[1] + ((z / (resolution - 1)) - 0.5) * size;

            textures[z * resolution + x] = h(px, pz);
        }

    }
    const normals = new Float32Array(positions.length);
    const uv = new Float32Array((subdivisions + 1) * (subdivisions + 1) * 2);
    const e = size / subdivisions;

    for (let x = 0; x <= subdivisions; x++) {
        for (let z = 0; z <= subdivisions; z++) {
            const i = z * (subdivisions + 1) + x;
            const px = positions[i * 3];
            const pz = positions[i * 3 + 2];

            // slope in X and Z
            const dx = h(px - e, pz) - h(px + e, pz);
            const dz = h(px, pz - e) - h(px, pz + e);

            // normal = (-dh/dx, 1, -dh/dz), normalized
            const nx = dx, ny = 2 * e, nz = dz;
            const len = Math.hypot(nx, ny, nz);

            normals[i * 3] = nx / len;
            normals[i * 3 + 1] = ny / len;
            normals[i * 3 + 2] = nz / len;

            uv[i * 2] = x / subdivisions;
            uv[i * 2 + 1] = z / subdivisions;
        }
    }

    postMessage(
        { id, positions, indices, textures, resolution, normals, uv },
    );

}