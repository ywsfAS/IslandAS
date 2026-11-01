import type { ContactZoneState } from "../../../state/zones/contactZone/contactZone";
import type { ZoneParams } from "../types";
import { Zone } from "../zone";

export class ContactZone extends Zone {
    constructor(state: ContactZoneState, options?: Partial<ZoneParams>) {
        super(state, options);
    }

    public override onEnter() {
        super.onEnter();
    }
    public override onExit() {
        super.onExit();
    }
    public override update() {
        super.update();
    }
} 