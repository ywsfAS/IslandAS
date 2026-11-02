import * as THREE from "three";
import type { IntroZoneState } from "../../../state/zones/introZone/introZone";
import { Bedroll } from "../../models/intro/bedroll/bedroll";
import { BedrollPacked } from "../../models/intro/bedrollPacked/bedrollPacked";
import { CampfirePit } from "../../models/intro/campfirePit/campfirePit";
import { CampfireStand } from "../../models/intro/campfireStand/campfireStand";
import { Floor } from "../../models/intro/floor/floor";
import type { Model } from "../../models/model";
import { TentCanvas } from "../../models/intro/tentCanvas/tentCanvas";
import type { ZoneParams } from "../types";
import { Zone } from "../zone";

export class IntroZone extends Zone {
    private readonly _models: Model[];

    constructor(state: IntroZoneState, options?: Partial<ZoneParams>) {
        super(state, options);

        const positionAt = (offsetX: number, offsetZ: number) => new THREE.Vector3(
            state.center[0] + offsetX,
            0,
            state.center[1] + offsetZ,
        );

        this._models = [
            new Floor({ position: positionAt(0, 0) }),
            new TentCanvas({ position: positionAt(-10, -2) }),
            new Bedroll({ position: positionAt(-20, 10) }),
            new BedrollPacked({ position: positionAt(-30, 4.5) }),
            new CampfirePit({ position: positionAt(-20, 2) }),
            new CampfireStand({ position: positionAt(40, 2) }),
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
        for (const model of this._models) {
            model.update();
        }
    }
}