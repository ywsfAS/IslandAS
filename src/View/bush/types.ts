export interface BushViewOptions {
    radius: number;
    bushHeight: number;
    floorHeight: number;
    groundSink: number;

    clumpCount: number;
    clumpSpread: number;
    clumpMinRadius: number;
    clumpMaxRadius: number;

    leafCount: number;
    leafLength: number;
    leafWidthRatio: number;
    leafSizeVariation: number;

    deepColor: string;
    standardColor: string;
    lightColor: string;

    castShadow: boolean;
    receiveShadow: boolean;
}