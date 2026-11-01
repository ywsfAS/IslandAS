import { EventEmitter } from "events";
import { IntroZoneState } from "./introZone/introZone";
import type { ZoneState } from "./zone";
import { ContactZoneState } from "./contactZone/contactZone";
import { WorkShopZoneState } from "./workshopZone/workshopZone";

export class ZoneManagerState {

    private readonly _zones: Map<number, ZoneState> = new Map();
    private readonly _events: EventEmitter = new EventEmitter();
    private _id: number = 0;

    constructor() {
    }
    public initialize() {
        this.setIntroZone();
        this.setContactZone();
        this.setWorkShopZone();
    }

    get events(): EventEmitter {
        return this._events;
    }
    public setIntroZone() {
        const introZone = new IntroZoneState(this._id);
        this._zones.set(this._id, introZone);
        this._id++;

        this._events.emit("intro-state-created", introZone);
    }
    public setContactZone() {
        const contactZone = new ContactZoneState(this._id);
        this._zones.set(this._id, contactZone);

        this._id++;
        this._events.emit("contact-state-created", contactZone);

    }
    public setWorkShopZone() {
        const workShopZone = new WorkShopZoneState(this._id);
        this._zones.set(this._id, workShopZone);

        this._id++;
        this._events.emit("workshop-state-created", workShopZone);

    }
    public update() {
        for (let zone of this._zones.values()) {
            zone.update();
        }
    }

}