import type { ModelOptions } from "../../types";

export type BottleSize = "small" | "large";
export type BottleOptions = Partial<Omit<ModelOptions, "asset">>;
