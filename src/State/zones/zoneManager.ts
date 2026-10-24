import { IntroZone } from "./introZone/introZone";
import type { Zone } from "./zone";

export class ZoneManager {

    private readonly _zones: Set<Zone> = new Set();
    constructor() {
        this.setIntroZone();
    }

    public setIntroZone() {
        const introZone = new IntroZone();
        this._zones.add(introZone);
    }
    public update() {
        for (let zone of this._zones.values()) {
            zone.update();
        }
    }

}