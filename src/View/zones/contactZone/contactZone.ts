import type { ContactZoneState } from "../../../state/zones/contactZone/contactZone";
import { Github } from "../../logos/github/github";
import { Linkedin } from "../../logos/linkedin/linkedin";
import type { Logo } from "../../logos/logo";
import { TypeScriptLogo } from "../../logos/typescript/typescript";
import type { ZoneParams } from "../types";
import { setPosition } from "../utilities";
import { Zone } from "../zone";
import type { Model } from "../../models/model";
import { BannerRed } from "../../models/contact/bannerRed/bannerRed";
import { StallBench } from "../../models/contact/stallBench/stallBench";
import { StallRed } from "../../models/contact/stallRed/stallRed";
import { Stall } from "../../models/contact/stall/stall";

export class ContactZone extends Zone {
    private readonly _logos: Logo[];
    private readonly _models: Model[];
    constructor(state: ContactZoneState, options?: Partial<ZoneParams>) {
        super(state, options);

        const positionAt = (offsetX: number, offsetZ: number, offsetY?: number) => setPosition(state.center, offsetX, offsetZ, offsetY);

        this._models = [
            new Stall({ position: positionAt(-22, -20) }),
            new StallRed({ position: positionAt(22, -20) }),
            new StallBench({ position: positionAt(-22, 20) }),
            new BannerRed({ position: positionAt(22, 20) }),
        ];

        this._logos = [
            new Github({ position: positionAt(0, 0) }),
            new Linkedin({ position: positionAt(10, 0) }),
            new TypeScriptLogo({ position: positionAt(-10, 0) }),
        ];
    }

    public override onEnter() {
        super.onEnter();
    }
    public override onExit() {
        super.onExit();
    }
    public override update() {
        super.update();
        this._logos.forEach(logo => logo.update());
        this._models.forEach(model => model.update());
    }
}