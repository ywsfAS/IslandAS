import type { ZoneParams } from "../../../view/zones/types";
import { ZoneState } from "../zone";
import { DEFAULT_CONTACT_CONFIGS } from './default';

export class ContactZoneState extends ZoneState {
    constructor(id: number, options: Partial<ZoneParams> = {}) {

        const opts = { ...DEFAULT_CONTACT_CONFIGS, ...options };
        super(id, opts);
    }

    public override onEnter(): void {
        super.onEnter();
        console.log("you are inside the zone");
    }
    public override onExit(): void {
        super.onExit();
        console.log("you are outside the zone");
    }

    public override update() {
        super.update();
    }
}