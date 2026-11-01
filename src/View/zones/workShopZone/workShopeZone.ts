import type { WorkShopZoneState } from "../../../state/zones/workshopZone/workshopZone";
import type { ZoneParams } from "../types";
import { Zone } from "../zone";

export class WorkShopZone extends Zone {

    constructor(state: WorkShopZoneState, options?: Partial<ZoneParams>) {
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