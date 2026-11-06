import * as THREE from "three";
import { Model } from "../model";
import { DEFAULT_SIGNPOST_SINGLE_MATERIAL, DEFAULT_SIGNPOST_SINGLE_OPTIONS } from "./default";
import { createSignpostLabels } from "../signpost/labels";
import type { SignpostSingleOptions } from "./types";

export class SignpostSingle extends Model {
    constructor(options: SignpostSingleOptions = {}) {
        super(DEFAULT_SIGNPOST_SINGLE_OPTIONS, options);
    }

    protected override setMeshMaterial(mesh: THREE.Mesh): void {
        mesh.material = new THREE.MeshStandardMaterial({
            ...DEFAULT_SIGNPOST_SINGLE_MATERIAL,
            map: this._introTexture,
        });
    }

    public override onLoad(): void {
        if (this._group.getObjectByName("signpost-labels")) return;
        this._group.add(createSignpostLabels([
            { text: "WORKSHOP", y: 0.386, rotation: -Math.PI / 50},
        ]));
    }
}
