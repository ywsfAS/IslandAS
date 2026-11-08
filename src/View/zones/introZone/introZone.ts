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
            'Driven by curiosity',
            'My Journey',
            'fa-solid fa-book-open',
            'Understanding beyond the surface',
            "My interest in software started with a simple curiosity about computers and how the things we use every day actually work. Over time, that curiosity grew into a passion for programming, from building web applications to exploring system programming and low-level concepts. I enjoy understanding the internals behind the abstractions, experimenting with new ideas, building things, and constantly learning through books and hands-on exploration."
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
            'From low-level programming to full-stack development, I enjoy working with C, C++, C#, .NET, TypeScript, React, and SQL. Each tool offers a different way to understand problems, build solutions, and turn ideas into working software.'
        )),
        new IntroMenu(createIntroMenuOptions(
            positionAt(0, 0, 8),
            'Beyond the code',
            'More',
            'fa-solid fa-compass',
            'Beyond the code',
            'Curiosity drives me. I love experimenting, figuring out how things work, and building experiences people can interact with. The more I learn, the more I realize how much I don\'t know (-_-), and that keeps me going.'

        )),
        new IntroMenu(createIntroMenuOptions(
            positionAt(0, -30, 6),
            'A hidden secret',
            'Treasure',
            'fa-solid fa-gem',
            'Keep it between us...',
            "Were you really expecting to find treasure here? Hehehe. No gold, no diamonds... just a few things about me that you won't find in the usual (or Claude-vibecoded) portfolio."

        )),
        new IntroMenu(createIntroMenuOptions(
            positionAt(20, -8, 6),
            'A few pages of inspiration',
            'Favorite Books',
            'fa-solid fa-bookmark',
            'Books worth exploring',
            "Some books that have shaped the way I think about software and problem-solving: Domain-Driven Design by Eric Evans, The Art of Computer Programming by Donald Knuth, and Data Structures and Algorithm Analysis in C++ by Mark Allen Weiss. Always something new to learn between the pages."
        )),
        new IntroMenu(createIntroMenuOptions(
            positionAt(-20, 0, 4),
            'THE RESTING PLACE',
            'Rest',
            'fa-solid fa-bed',
            'Where 7 hours of sleep across two days is considered a healthy lifestyle.',
            "A wise man once said that 7 hours of sleep in 48 hours is perfectly normal. Probably an engineering professor. Between calculating A* by hand, listening to AI lectures that somehow have nothing to do with actual AI, and trying to understand how the teacher ended up teaching Computer Science... sleep becomes a luxury. Anyway, I'm sure this is fine."
        ))
        ];

        this._models = [
            new Floor({ position: positionAt(0, 30) }),
            new TentCanvas({ position: positionAt(0, 30) }),
            new BenchShort({ position: positionAt(0, 20), rotation: new THREE.Euler(0, Math.PI, 0) }),

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