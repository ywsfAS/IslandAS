import type { ModelOptions } from "../../types";

export type TreeLogOption = Partial<Omit<ModelOptions, "asset">>;
export type TreeLogSize = "normal" | "small";