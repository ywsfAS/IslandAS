import * as THREE from 'three';
export interface ZoneParams {
    geometry: Partial<RingGeometryParams>;
    matrial?: Partial<THREE.MeshBasicMaterialParameters>

}
export interface RingGeometryParams {
    outerRadius: number;
    thetaSegments: number;
    phiSegments: number;

}