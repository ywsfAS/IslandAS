import { Model } from "../../model";
import { DEFAULT_CHEST_OPTIONS } from "./default";
import type { ChestOptions } from "./types";

export class Chest extends Model {
    constructor(options: ChestOptions = {}) {
        super(DEFAULT_CHEST_OPTIONS, options);
    }
}
