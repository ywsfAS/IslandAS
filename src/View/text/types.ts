import type { MeshBasicMaterial, Vector3 } from "three";
import type { TextGeometryParameters } from "three/examples/jsm/Addons.js";

export interface TextOptions {
    fontUrl: string;
    text: string;
    textGeometryParams?: Partial<Omit<TextGeometryParameters, 'font'>>;
    textMaterialParams?: Partial<MeshBasicMaterial>;
    initPosition: Vector3;
    initRotation: Vector3;

}