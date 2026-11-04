import { ZoneState } from "../zone";
import { IntroTreesState } from "./introTrees/introTrees";

export class IntroZoneState extends ZoneState {
    private readonly _trees: IntroTreesState;

    constructor(id: number) {
        super(id);
        this._trees = new IntroTreesState({ center: this.center, radius: this.radius });
    }

    get trees(): IntroTreesState {
        return this._trees;
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