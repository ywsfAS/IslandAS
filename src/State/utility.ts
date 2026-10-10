import { vec2 } from 'gl-matrix';

export interface TerrainHeight {
    positions: Float32Array;
    size: number;
    center: vec2;
    subdivisions: number;
}
export function getTerrainHeight(point: vec2, { size, subdivisions, center, positions }: TerrainHeight): number {

    // get realtive centered (x,z)
    const halfSize = size * 0.5;

    const segments = subdivisions + 1;
    const segmentSize = size / subdivisions;

    const relativeX = point[0] - center[0] + halfSize;
    const relativeZ = point[1] - center[1] + halfSize;

    // referx to index of points or cell
    const XIndexA = Math.floor(relativeX / segmentSize);
    const ZIndexA = Math.floor(relativeZ / segmentSize);

    const XIndexC = XIndexA + 1;
    const ZIndexC = ZIndexA + 1;

    const ratioX = (relativeX / segmentSize) % 1;
    const ratioZ = (relativeZ / segmentSize) % 1;

    const XIndexB = ratioX < ratioZ ? XIndexA : XIndexA + 1;
    const ZIndexB = ratioX > ratioZ ? ZIndexA + 1 : ZIndexA;

    const indexPosA = (ZIndexA * segments + XIndexA) * 3;
    const indexPosB = (ZIndexB * segments + XIndexB) * 3;
    const indexPosC = (ZIndexC * segments + XIndexC) * 3;

    const aPositionZVal = positions[indexPosA + 1];
    const bPositionZVal = positions[indexPosB + 1];
    const cPositionZVal = positions[indexPosC + 1];


    const w1 = ratioX >= ratioZ ? 1 - ratioX : 1 - ratioZ;
    const w2 = ratioX >= ratioZ ? ratioX - ratioZ : ratioZ - ratioX;
    const w3 = ratioX >= ratioZ ? ratioZ : ratioX;

    const finalZ = w1 * aPositionZVal + w2 * bPositionZVal + w3 * cPositionZVal;

    return finalZ;

}