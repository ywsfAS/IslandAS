import * as THREE from "three";
import { State } from "../../state/state";
import type { ContactZoneState } from "../../state/zones/contactZone/contactZone";
import type { IntroZoneState } from "../../state/zones/introZone/introZone";
import type { WorkShopZoneState } from "../../state/zones/workshopZone/workshopZone";
import { ZoneManagerState } from "../../state/zones/zoneManager";
import type { Model } from "../models/model";
import { Signpost } from "../models/signpost/signpost";
import { SignpostSingle } from "../models/signpostSingle/signpostSingle";
import { ContactZone } from "./contactZone/contactZone";
import { IntroZone } from "./introZone/introZone";
import { WorkShopZone } from "./workShopZone/workShopeZone";
import type { CenterZoneState } from "../../state/zones/centerZone/centerZone";
import { CenterZone } from "./centerZone/centerZone";
import type { Zone } from "./zone";

export class ZoneManager {

    private readonly _zones: Map<number, Zone> = new Map();
    private readonly _state: ZoneManagerState;
    private readonly _models: Model[];

    constructor() {
        const state = State.getInstance();

        this._state = state.zoneManager;

        this._state.events.on("center-state-created", (zoneState: CenterZoneState) => {
            this.setCenterZone(zoneState);
        })
        this._state.events.on("intro-state-created", (zoneState: IntroZoneState) => {
            this.setIntroZone(zoneState);
        })
        this._state.events.on("contact-state-created", (zoneState: ContactZoneState) => {
            this.setContactZone(zoneState);
        })
        this._state.events.on("workshop-state-created", (zoneState: WorkShopZoneState) => {
            this.setWorkShopZone(zoneState);
        })

        this._state.initialize();

        this._models = [
            new Signpost({
                position: new THREE.Vector3(20, 0, 10),
                rotation: new THREE.Euler(0, Math.PI, 0),
            }),
            new SignpostSingle({
                position: new THREE.Vector3(-20, 0, 10),
                rotation: new THREE.Euler(0, Math.PI / 2, 0),
            }),
        ];
    };
    public setCenterZone(state: CenterZoneState) {
        const centerZone = new CenterZone(state);
        this._zones.set(state.id, centerZone);
    }
    public setIntroZone(state: IntroZoneState) {
        const introZone = new IntroZone(state);
        this._zones.set(state.id, introZone);

    }
    public setContactZone(state: ContactZoneState) {
        const contactZone = new ContactZone(state);
        this._zones.set(state.id, contactZone);
    }
    public setWorkShopZone(state: WorkShopZoneState) {
        const workShopZone = new WorkShopZone(state);
        this._zones.set(state.id, workShopZone);
    }

    public update() {
        for (const zone of this._zones.values()) {
            zone.update();
        }
        for (const model of this._models) {
            model.update();
        }
    }
}