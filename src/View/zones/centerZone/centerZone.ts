import type { CenterZoneState } from "../../../state/zones/centerZone/centerZone";
import type { ZoneParams } from "../types";
import { Zone } from "../zone";

export class CenterZone extends Zone {
    constructor(state: CenterZoneState, options?: Partial<ZoneParams>) {
        super(state, options);
    }
}
