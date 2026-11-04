import type { ModelOptions } from "../../types";

export type BoxSize = "normal" | "small";
export type BoxStatus = "open" | "closed";

export type BoxOptions = Partial<Omit<ModelOptions, "asset">>;