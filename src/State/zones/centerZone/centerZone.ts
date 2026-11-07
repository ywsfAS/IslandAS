import { ZoneState } from "../zone";
import { DEFAULT_CENTER_ZONE_CONFIGS } from "./default";

export class CenterZoneState extends ZoneState {
    constructor(id: number) {
        super(id, DEFAULT_CENTER_ZONE_CONFIGS);
    }
}
