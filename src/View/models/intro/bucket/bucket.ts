import { Model } from "../../model";
import { DEFAULT_BUCKET_OPTIONS } from "./default";
import type { BucketOptions } from "./types";

export class Bucket extends Model {
    constructor(options: BucketOptions = {}) {
        super(DEFAULT_BUCKET_OPTIONS, options);
    }
}
