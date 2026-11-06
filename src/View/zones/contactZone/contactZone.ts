import type { ContactZoneState } from "../../../state/zones/contactZone/contactZone";
import { Github } from "../../logos/github/github";
import { Linkedin } from "../../logos/linkedin/linkedin";
import type { Logo } from "../../logos/logo";
import { TypeScriptLogo } from "../../logos/typescript/typescript";
import type { ZoneParams } from "../types";
import { setPosition } from "../utilities";
import { Zone } from "../zone";
import type { Model } from "../../models/model";
import { IntroMenu } from "../../menu/intro/introMenu";
import { createIntroMenuOptions } from "../../menu/intro/default";
import type { InteractiveCard } from "../../cards/interactiveCard";
import { StallBench } from "../../models/contact/stallBench/stallBench";
import { Stall } from "../../models/contact/stall/stall";
import { Bench } from "../../models/contact/bench/bench";
import { Lantern } from "../../models/contact/lantern/lantern";
import { PresentCube } from "../../models/contact/presentCube/presentCube";
import { PresentRectangle } from "../../models/contact/presentRectangle/presentRectangle";
import { Wreath } from "../../models/contact/wreath/wreath";
import { Mailbox } from "../../models/contact/mailbox/mailbox";
import * as THREE from 'three';

export class ContactZone extends Zone {
    private readonly _logos: Logo[];
    private readonly _models: Model[];
    private readonly _menus: InteractiveCard[];
    constructor(state: ContactZoneState, options?: Partial<ZoneParams>) {
        super(state, options);

        const positionAt = (offsetX: number, offsetZ: number, offsetY?: number) => setPosition(state.center, offsetX, offsetZ, offsetY);

        this._menus = [
            new IntroMenu(createIntroMenuOptions(
                positionAt(5, 0, 7),
                'Take a seat',
                'Rest',
                'fa-solid fa-chair',
                'A moment to pause',
                'Take a seat, enjoy the island, and stay awhile.',
            )),
            new IntroMenu(createIntroMenuOptions(
                positionAt(5, 7.5, 10),
                'Check the mailbox',
                'Send',
                'fa-solid fa-envelope',
                'Have something in mind?',
                "Drop me a message and let's talk.",
            )),
        ];

        this._models = [
            new Bench({ position: positionAt(5, 0), rotation: new THREE.Euler(0, 3 * Math.PI / 2, 0) }),
            new Lantern({ position: positionAt(5, -8) }),
            new PresentCube({ position: positionAt(0, 4) }),
            new PresentRectangle({ position: positionAt(0, -4) }),
            new Wreath({ position: positionAt(-1, 0), rotation: new THREE.Euler(0, Math.PI / 2, 0) }),
            new Mailbox({ position: positionAt(5, 8), rotation: new THREE.Euler(0, 3 * Math.PI / 2, 0) }),
        ];

        this._logos = [
            new Github({ position: positionAt(-8, 0) }),
            new Linkedin({ position: positionAt(-8, -8) }),
            new TypeScriptLogo({ position: positionAt(-8, 8) }),
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