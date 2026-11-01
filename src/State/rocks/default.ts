import type { RocksStateOptions } from './types';

export const DEFAULT_ROCKS_CONFIG: RocksStateOptions = {
    rocksPerChunk: 15,
    maxCount: 1000,
    minHeight: 0.5,
};
