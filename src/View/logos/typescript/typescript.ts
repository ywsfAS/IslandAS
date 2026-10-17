import { Logo } from '../logo';
import { DEFAULT_TYPESCRIPT_OPTIONS } from './default';
import type { TypeScriptOptions } from './types';

export class TypeScriptLogo extends Logo {
    constructor(options: TypeScriptOptions = {}) {
        super(DEFAULT_TYPESCRIPT_OPTIONS, options);
    }
}
