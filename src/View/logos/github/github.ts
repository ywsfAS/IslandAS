import { Logo } from '../logo';
import { DEFAULT_GITHUB_OPTIONS } from './default';
import type { GithubOptions } from './types';

export class Github extends Logo {
    constructor(options: GithubOptions = {}) {
        super(DEFAULT_GITHUB_OPTIONS, options);
    }
}
