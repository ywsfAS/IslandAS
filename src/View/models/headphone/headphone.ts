import { Model } from "../model";
import { DEFAULT_KEYBOARD_OPTIONS } from './default';
import type { HeadphoneOptions } from "./types";

export class Headphone extends Model {

    constructor(options: HeadphoneOptions = {}) {
        super(DEFAULT_KEYBOARD_OPTIONS, options);
    }
}