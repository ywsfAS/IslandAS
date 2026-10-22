import * as THREE from 'three';
import type { TextOptions } from './types';


export const DEFAULT_TEXT_CONFIGS: TextOptions = {
    fontUrl: 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',
    text: 'Youssef AS',
    textGeometryParams: {
        size: 4,
        depth: 1,
        curveSegments: 4,
        bevelEnabled: true,
        bevelSize: 0.2,
        bevelThickness: 0.0000001
    },
    textMaterialParams: {
        color: 0xffffff,
        fog: false,
        toneMapped: false
    },
    initPosition: new THREE.Vector3(0, 0, -10),
    initRotation: new THREE.Vector3(Math.PI, Math.PI, Math.PI),
}