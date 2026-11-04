import { Model } from "../../model";
import type { ModelOptions } from "../../types";
import { DEFAULT_NORMAL_TREE_LOG_OPTIONS, DEFAULT_SMALL_TREE_LOG_OPTIONS } from "./default";
import type { TreeLogOption, TreeLogSize } from "./types";

export class TreeLog extends Model {
    constructor(options: TreeLogOption, size: TreeLogSize = "normal") {
        const modelConfig : ModelOptions = size === "normal" ? DEFAULT_NORMAL_TREE_LOG_OPTIONS : DEFAULT_SMALL_TREE_LOG_OPTIONS;
            super(modelConfig, options);
    }
}