import { Model } from "../../model";
import { DEFAULT_GRASS_STAND_OPTIONS } from "./default";
import type { grassStandOption } from "./types";

export class GrassStand extends Model {

    constructor(options: grassStandOption) {
        super(DEFAULT_GRASS_STAND_OPTIONS, options);
    }
}