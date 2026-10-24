import { ZoneState } from "../zone";

export class IntroZoneState extends ZoneState {

    constructor(id: number) {
        super(id);
    }
    public onEnter(): void {
        console.log("you are inside the zone");
    }
    public onExit(): void {
        console.log("you are outside the zone");
    }

    public override update() {
        super.update();
    }

}