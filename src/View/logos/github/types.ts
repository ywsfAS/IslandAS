import type { LogoOptions } from '../types';

export type GithubOptions = Partial<Omit<LogoOptions, 'asset'>>;
