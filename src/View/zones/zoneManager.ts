import { State } from "../../state/state";
import type { IntroZoneState } from "../../state/zones/introZone/introZone";
import { ZoneManagerState } from "../../state/zones/zoneManager";
import { IntroZone } from "./introZone/introZone";
import type { Zone } from "./zone";

export class ZoneManager {

    private readonly _zones: Map<number, Zone> = new Map();
    private readonly _state: ZoneManagerState;

    constructor() {
        const state = State.getInstance();

        this._state = state.zoneManager;

        this._state.events.on("intro-state-created", (zoneState: IntroZoneState) => {
            this.setIntroZone(zoneState);
        })

        this._state.initialize();
    };
    public setIntroZone(state: IntroZoneState) {
        const introZone = new IntroZone(state);
        this._zones.set(state.id, introZone);

    }


}