import { Logo } from '../logo';
import { DEFAULT_LINKEDIN_OPTIONS } from './default';
import type { LinkedinOptions } from './types';

export class Linkedin extends Logo {
    constructor(options: LinkedinOptions = {}) {
        super(DEFAULT_LINKEDIN_OPTIONS, options);
    }
}
