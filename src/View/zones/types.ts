import * as THREE from 'three';
export interface ZoneParams {
    geometry: RingGeometryParams;
    matrial?: Partial<THREE.MeshBasicMaterialParameters>

}
export interface RingGeometryParams {
    outerRadius: number;
    thetaSegments: number;

}