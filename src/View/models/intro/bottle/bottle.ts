import { Model } from "../../model";
import { BOTTLE_OPTIONS } from "./default";
import type { BottleOptions, BottleSize } from "./types";

export class Bottle extends Model {
    constructor(options: BottleOptions = {}, size: BottleSize = "small") {
        super(BOTTLE_OPTIONS[size], options);
    }
}
