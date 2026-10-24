import { Zone } from "../zone";

export class IntroZone extends Zone {

    constructor() {
        super();
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