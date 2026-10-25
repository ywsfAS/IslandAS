import { ZoneState } from "../zone";

export class IntroZoneState extends ZoneState {

    constructor(id: number) {
        super(id);
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