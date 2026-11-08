import { Howl, Howler } from "howler";
import type { AudioControls } from "./types";

export class AudioManager {
    private readonly _sounds = new Map<string, Howl>();
    private _isDisposed = false;

    private ensureActive(): void {
        if (this._isDisposed) {
            throw new Error("Cannot use the audio manager after it has been disposed.");
        }
    }

    public async resume(): Promise<void> {
        this.ensureActive();
        const context = Howler.ctx;
        if (context && context.state !== "running") {
            await context.resume();
        }
    }

    public async play(path: string, loop = false): Promise<AudioControls> {
        this.ensureActive();
        if (!path) {
            throw new Error("An audio path is required.");
        }

        const key = `${path}:${loop}`;
        let sound = this._sounds.get(key);
        if (!sound) {
            sound = new Howl({ src: [path], loop, preload: true });
            this._sounds.set(key, sound);
        }

        if (sound.state() !== "loaded") {
            await new Promise<void>((resolve, reject) => {
                sound.once("load", () => resolve());
                sound.once("loaderror", (_id, error) => {
                    reject(new Error(`Failed to load audio "${path}": ${String(error)}`));
                });
            });
        }

        this.ensureActive();
        const id = sound.play();
        return {
            setVolume: volume => sound!.volume(this.normalizeVolume(volume), id),
            stop: () => sound!.stop(id),
        };
    }

    public stopAll(): void {
        this.ensureActive();
        for (const sound of this._sounds.values()) {
            sound.stop();
        }
    }

    public dispose(): void {
        if (this._isDisposed) {
            return;
        }

        this._isDisposed = true;
        for (const sound of this._sounds.values()) {
            sound.unload();
        }
        this._sounds.clear();
    }

    public setMasterVolume(volume: number): void {
        this.ensureActive();
        Howler.volume(this.normalizeVolume(volume));
    }

    private normalizeVolume(volume: number): number {
        if (!Number.isFinite(volume)) {
            throw new RangeError("Volume must be a finite number.");
        }
        return Math.max(0, Math.min(1, volume));
    }
}
