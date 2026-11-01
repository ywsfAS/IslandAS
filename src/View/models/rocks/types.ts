import type { ModelOptions } from '../types';

export interface RocksOptions extends Partial<Omit<ModelOptions, 'asset'>> {
    minScale: number;
    maxScale: number;
}
