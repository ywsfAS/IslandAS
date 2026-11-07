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
import { IntroTree } from "../../models/intro/trees/trees";
import { IntroMenu } from "../../menu/intro/introMenu";
import { createIntroMenuOptions } from "../../menu/intro/default";
import { Fire } from "../../models/intro/fire/fire";
import type { InteractiveCard } from "../../cards/interactiveCard";
import { setPosition } from "../utilities";
import { BenchShort } from "../../models/contact/benchShort/benchShort";

export class IntroZone extends Zone {
    private readonly _models: Model[];
    private readonly _menus: InteractiveCard[];

    constructor(state: IntroZoneState, options?: Partial<ZoneParams>) {
        super(state, options);
        const treeOptions = { positions: state.trees.positions };
        new IntroTree("tree", treeOptions);
        new IntroTree("tree-trunk", treeOptions);


        const positionAt = (offsetX: number, offsetZ: number, offsetY?: number) => setPosition(state.center, offsetX, offsetZ, offsetY);

        this._menus = [new IntroMenu(createIntroMenuOptions(
            positionAt(0, 30, 12),
            'About my journey',
            'Journey',
            'fa-solid fa-book-open',
            'A little about me',
            "I'm a software engineering student passionate about building things, exploring technology, and turning ideas into real experiences.",
        )),
        new IntroMenu(createIntroMenuOptions(
            positionAt(20, 0, 10),
            'What I build',
            'Projects',
            'fa-solid fa-code',
            'Building things',
            'I enjoy designing and developing software, with a focus on backend engineering, architecture, and interactive experiences.',
        )),
        new IntroMenu(createIntroMenuOptions(
            positionAt(20, 16, 10),
            'My toolbox',
            'Skills',
            'fa-solid fa-toolbox',
            'Tools of the trade',
            'C#, .NET, TypeScript, React, SQL, and more. These are some of the technologies I use to bring ideas to life.',
        )),
        new IntroMenu(createIntroMenuOptions(
            positionAt(0, 0, 8),
            'Beyond the code',
            'More',
            'fa-solid fa-fire',
            'Beyond the code',
            'Curiosity drives me. I enjoy experimenting, learning how things work, and creating experiences that people can interact with.',
        )),

        ];

        this._models = [
            new Floor({ position: positionAt(0, 30) }),
            new TentCanvas({ position: positionAt(0, 30) }),
            new BenchShort({ position: positionAt(0, 20), rotation: new THREE.Euler(0, Math.PI , 0) }),

            new Bedroll({ position: positionAt(-20, 0, 10), rotation: new THREE.Euler(0, Math.PI, 0) }),
            new BedrollPacked({ position: positionAt(-20, 8) }),

            // campfire at the center of the zone
            new CampfirePit({ position: positionAt(0, 0) }),
            new Fire({ position: positionAt(0, 0, 10) }),
            new CampfireStand({ position: positionAt(0, 0) }),

            // tree logs around the campfire small / normal ones
            new TreeLog({ position: positionAt(10, 0) }, "small"),
            new TreeLog({ position: positionAt(-10, 0) }, "small"),

            new TreeLog({ position: positionAt(5, 5), scale: new THREE.Vector3(6, 6, 6), rotation: new THREE.Euler(0, -Math.PI / 4) }, "small"),
            new TreeLog({ position: positionAt(-5, -5), scale: new THREE.Vector3(6, 6, 6), rotation: new THREE.Euler(0, Math.PI / 4) }, "small"),
            new TreeLog({ position: positionAt(5, -5), scale: new THREE.Vector3(6, 6, 6), rotation: new THREE.Euler(0, -Math.PI / 4) }, "small"),
            new TreeLog({ position: positionAt(-5, 5), scale: new THREE.Vector3(6, 6, 6), rotation: new THREE.Euler(0, Math.PI / 4) }, "small"),

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