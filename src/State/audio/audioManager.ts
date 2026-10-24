
export class AudioManager {
    private readonly _context: AudioContext;
    private readonly _gain: GainNode;

    private readonly _buffers = new Map<string, AudioBuffer>();
    private readonly _loading = new Map<string, Promise<AudioBuffer>>();

    private readonly _sources = new Set<AudioBufferSourceNode>();

    private _isDisposed = false;

    constructor() {

        this._context = new AudioContext();
        this._gain = this._context.createGain();
        this._gain.gain.value = 1.0;


        this._gain.connect(this._context.destination);

    }
    private ensureActive(): void {
        if (this._isDisposed) {
            throw new Error("can't do this action the Audio Manager is already dispoed");
        }
    }
    public async resume(): Promise<void> {
        this.ensureActive();
        if (this._context.state !== 'running') {
            await this._context.resume();
        }
    }
    public async load(path: string): Promise<AudioBuffer> {
        this.ensureActive();
        const cachedBuffer = this._buffers.get(path);
        if (cachedBuffer) {
            return cachedBuffer;
        }
        const loadedBuffer = this._loading.get(path);
        if (loadedBuffer) {
            return loadedBuffer;
        }

        const req = this.fetch(path);
        this._loading.set(path, req);

        try {
            return await req;
        } finally {
            if (this._loading.get(path) === req) {
                this._loading.delete(path);
            }
        }



    }
    public async fetch(path: string): Promise<AudioBuffer> {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(`Failed to fetch the file in path ${path}`);
        }

        const data = await response.arrayBuffer();
        const buffer = await this._context.decodeAudioData(data);

        this.ensureActive();
        this._buffers.set(path, buffer);

        return buffer;


    }
    public async play(path: string, loop: boolean): Promise<void> {
        this.ensureActive();
        const buffer = await this.load(path);
        const source = this._context.createBufferSource();
        source.buffer = buffer;
        source.loop = loop;

        source.connect(this._gain);

        this._sources.add(source);

        source.addEventListener('ended', () => {
            this._sources.delete(source);
            source.disconnect();
        }, { once: true });


        source.start();

    }
    public stopAll(): void {
        this.ensureActive();
        for (const source of this._sources) {
            source.stop();
        }
    }
    public dispose(): void {
        if (this._isDisposed) {
            return;
        }

        this._isDisposed = true;

        for (const source of this._sources) {
            source.onended = null;

            try {
                source.stop();
            } catch {
                throw new Error("this source is already stopped");
            }

            source.disconnect();
        }

        this._sources.clear();
        this._buffers.clear();
        this._loading.clear();

        this._gain.disconnect();

        void this._context.close();
    }
    public setMasterVolume(volume: number): void {
        this.ensureActive();

        if (!Number.isFinite(volume)) {
            throw new RangeError("Volume must be a finite number.");
        }

        const normalized = Math.max(0, Math.min(1, volume));
        this._gain.gain.setTargetAtTime(
            normalized,
            this._context.currentTime,
            0.015,
        );
    }


}