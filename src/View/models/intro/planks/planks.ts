import { Model } from "../../model";
import { DEFAULT_PLANKS_OPTIONS } from "./default";
import type { PlanksOptions } from "./types";

export class Planks extends Model {
    constructor(options: PlanksOptions = {}) {
        super(DEFAULT_PLANKS_OPTIONS, options);
    }
}
