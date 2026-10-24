import type { IntroZoneState } from "../../../state/zones/introZone/introZone";
import type { ZoneParams } from "../types";
import { Zone } from "../zone";

export class IntroZone extends Zone {

    constructor(state: IntroZoneState, options?: Partial<ZoneParams>) {
        super(state, options);
    }
    public override update() {
        super.update();
    }
}