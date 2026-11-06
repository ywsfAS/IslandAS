import * as THREE from "three";
import { Model } from "../model";
import { DEFAULT_SIGNPOST_MATERIAL, DEFAULT_SIGNPOST_OPTIONS } from "./default";
import { createSignpostLabels } from "./labels";
import type { SignpostOptions } from "./types";

export class Signpost extends Model {
    constructor(options: SignpostOptions = {}) {
        super(DEFAULT_SIGNPOST_OPTIONS, options);
    }

    protected override setMeshMaterial(mesh: THREE.Mesh): void {
        mesh.material = new THREE.MeshStandardMaterial({
            ...DEFAULT_SIGNPOST_MATERIAL,
            map: this._introTexture,
        });
    }

    public override onLoad(): void {
        if (this._group.getObjectByName("signpost-labels")) return;
        this._group.add(createSignpostLabels([
            { text: "CONNECT", y: 0.27, rotation: -Math.PI / 20 },
            { text: "INTRO", y: 0.386, rotation: -Math.PI / 56 },
        ]));
    }
}
