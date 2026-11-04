import { Model } from "../../model";
import type { BoxOptions, BoxSize, BoxStatus } from "./types";
import { BOX_OPTIONS } from './default';

export class Box extends Model {

    constructor(options: BoxOptions, size: BoxSize = "normal", status: BoxStatus = "closed") {

        const configModel = BOX_OPTIONS[size][status];

        super(configModel, options);

    }
}