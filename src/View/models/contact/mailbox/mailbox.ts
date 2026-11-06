import * as THREE from "three";
import { Model } from "../../model";
import { DEFAULT_MAILBOX_OPTIONS } from "./default";
import type { MailboxOptions } from "./types";

export class Mailbox extends Model {
    constructor(options: MailboxOptions = {}) {
        super(DEFAULT_MAILBOX_OPTIONS, options);
    }

    protected override setMeshMaterial(mesh: THREE.Mesh): void {
    }
}
