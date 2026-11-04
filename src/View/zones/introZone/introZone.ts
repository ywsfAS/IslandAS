import * as THREE from "three";
import type { IntroZoneState } from "../../../state/zones/introZone/introZone";
import { Bedroll } from "../../models/intro/bedroll/bedroll";
import { BedrollPacked } from "../../models/intro/bedrollPacked/bedrollPacked";
import { Barrel } from "../../models/intro/barrel/barrel";
import { BarrelOpen } from "../../models/intro/barrelOpen/barrelOpen";
import { CampfirePit } from "../../models/intro/campfirePit/campfirePit";
import { CampfireStand } from "../../models/intro/campfireStand/campfireStand";
import { Floor } from "../../models/intro/floor/floor";
import type { Model } from "../../models/model";
import { TentCanvas } from "../../models/intro/tentCanvas/tentCanvas";
import { ToolAxe } from "../../models/intro/toolAxe/toolAxe";
import { ToolAxeUpgraded } from "../../models/intro/toolAxeUpgraded/toolAxeUpgraded";
import { ToolPickaxe } from "../../models/intro/toolPickaxe/toolPickaxe";
import { ToolPickaxeUpgraded } from "../../models/intro/toolPickaxeUpgraded/toolPickaxeUpgraded";
import { Workbench } from "../../models/intro/workbench/workbench";
import { WorkbenchAnvil } from "../../models/intro/workbenchAnvil/workbenchAnvil";
import { WorkbenchGrind } from "../../models/intro/workbenchGrind/workbenchGrind";
import type { ZoneParams } from "../types";
import { Zone } from "../zone";
import { TreeLog } from "../../models/intro/tree-log/treeLog";
import { Box } from "../../models/intro/box/box";
import { Bucket } from "../../models/intro/bucket/bucket";
import { Bottle } from "../../models/intro/bottle/bottle";
import { Chest } from "../../models/intro/chest/chest";
import { Planks } from "../../models/intro/planks/planks";

export class IntroZone extends Zone {
    private readonly _models: Model[];

    constructor(state: IntroZoneState, options?: Partial<ZoneParams>) {
        super(state, options);

        const positionAt = (offsetX: number, offsetZ: number, offsetY = 0) => new THREE.Vector3(
            state.center[0] + offsetX,
            offsetY,
            state.center[1] + offsetZ,
        );

        this._models = [
            new Floor({ position: positionAt(0, 30) }),
            new TentCanvas({ position: positionAt(0, 30) }),

            new Bedroll({ position: positionAt(-20, 0, 10), rotation: new THREE.Euler(0, Math.PI, 0) }),
            new BedrollPacked({ position: positionAt(-20, 8) }),

            // campfire at the center of the zone
            new CampfirePit({ position: positionAt(0, 0) }),
            new CampfireStand({ position: positionAt(0, 0) }),

            // tree logs around the campfire small / normal ones
            new TreeLog({ position: positionAt(10, 0) }, "small"),
            new TreeLog({ position: positionAt(-10, 0) }, "small"),

            new TreeLog({ position: positionAt(0, 10), rotation: new THREE.Euler(0, Math.PI / 2, 0) }, "small"),
            new TreeLog({ position: positionAt(0, -10), rotation: new THREE.Euler(0, Math.PI / 2, 0) }, "small"),

            // barrel 
            new Barrel({ position: positionAt(10, 22) }),
            new BarrelOpen({ position: positionAt(10, 15) }),
            new Bucket({ position: positionAt(10, 8) }),
            new Chest({ position: positionAt(0, -30) }),
            new Bottle({ position: positionAt(0, -20) }, "small"),
            new Bottle({ position: positionAt(2, -20) }, "large"),

            // tools
            new ToolAxe({ position: positionAt(11.5, 0), rotation: new THREE.Euler(-Math.PI / 4, Math.PI / 2, 0) }),
            new ToolAxeUpgraded({ position: positionAt(-11.5, 0), rotation: new THREE.Euler(Math.PI / 4, Math.PI / 2, -Math.PI / 4) }),

            new ToolPickaxe({ position: positionAt(0, 11.5) }),
            new ToolPickaxeUpgraded({ position: positionAt(0, -11.5) }),

            // workbenches
            new Workbench({ position: positionAt(20, 0) }),
            new WorkbenchAnvil({ position: positionAt(20, 8) }),
            new WorkbenchGrind({ position: positionAt(20, 16) }),

            new Box({ position: positionAt(20, -8), rotation: new THREE.Euler(0, Math.PI / 2, 0) }),
            new Box({ position: positionAt(24, -8) }, "normal", "open"),
            new Box({ position: positionAt(14, -12) }, "small", "open"),
            new Planks({ position: positionAt(30, -16) }),

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