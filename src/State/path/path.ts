
import { EventEmitter } from 'events';
import * as THREE from 'three';
import { vec2, vec3 } from 'gl-matrix';
import { State } from '../state';
import type { TerrainsState } from '../terrains/terrains';
import type { PathStateOptions } from './types';
import { DEFAULT_PATH_CONFIG } from './default';
import type { TerrainState } from '../terrain/terrain';

export class PathState {
    private _points: vec3[];
    private _width: number;
    private _closed: boolean;
    private _curveType: PathStateOptions['curveType'];
    private _tension: number;

    private readonly _samples: number;
    private readonly _widthSegments: number;
    private readonly _uvScale: number;
    private readonly _yOffset: number;
    private readonly _smoothness: number;

    private readonly _events = new EventEmitter();
    private readonly _terrains: TerrainsState;

    private readonly _positions: Float32Array;
    private readonly _uv: Float32Array;
    private readonly _indices: Uint16Array | Uint32Array;

    private _curve: THREE.CatmullRomCurve3 | null = null;
    private _length = 0;
    private _isReady = false;
    private _destroyed = false;

    constructor(options: Partial<PathStateOptions> = {}) {
        const d = DEFAULT_PATH_CONFIG;

        this._points = (options.points ?? d.points).map((p) =>
            vec3.clone(p)
        );
        this._width = options.width ?? d.width;
        this._closed = options.closed ?? d.closed;
        this._curveType = options.curveType ?? d.curveType;
        this._tension = options.tension ?? d.tension;
        this._smoothness = options.smoothness ?? d.smoothness;

        this._samples = options.samples ?? d.samples;
        this._widthSegments = options.widthSegments ?? d.widthSegments;
        this._uvScale = options.uvScale ?? d.uvScale;
        this._yOffset = options.yOffset ?? d.yOffset;

        const vertexCount =
            (this._samples + 1) * (this._widthSegments + 1);

        this._positions = new Float32Array(vertexCount * 3);
        this._uv = new Float32Array(vertexCount * 2);
        this._indices = this.buildIndices(vertexCount);

        this._terrains = State.getInstance().Terrains;

        this._terrains.events.on('create', this.onTerrainCreated);

        this.tryBuild();
    }

    get events() {
        return this._events;
    }

    get isReady() {
        return this._isReady;
    }

    get points() {
        return this._points;
    }

    get width() {
        return this._width;
    }

    get closed() {
        return this._closed;
    }

    get curveType() {
        return this._curveType;
    }

    get tension() {
        return this._tension;
    }

    get positions() {
        return this._positions;
    }

    get uv() {
        return this._uv;
    }

    get indices() {
        return this._indices;
    }

    get curve() {
        return this._curve;
    }

    get length() {
        return this._length;
    }
    get widthSegments() {
        return this._widthSegments;
    }

    public destroy() {
        if (this._destroyed) return;

        this._destroyed = true;
        this._terrains.events.off('create', this.onTerrainCreated);
        this._events.removeAllListeners();
    }

    private onTerrainCreated = (terrain: TerrainState) => {
        if (this._destroyed || this._isReady) return;

        terrain.events.once('ready', this.tryBuild);
    };

    private tryBuild = () => {
        if (this._destroyed || this._isReady) return;
        if (this._points.length < 2) return;

        const curve = new THREE.CatmullRomCurve3(
            this._points.map(
                (p) => new THREE.Vector3(p[0], 0, p[2])
            ),
            this._closed,
            this._curveType,
            this._tension
        );

        const center = new THREE.Vector3();
        const tangent = new THREE.Vector3();
        const cols = this._widthSegments + 1;

        for (let i = 0; i <= this._samples; i++) {
            curve.getPointAt(i / this._samples, center);
            curve.getTangentAt(i / this._samples, tangent);

            tangent.y = 0;
            tangent.normalize();

            const sideX = -tangent.z;
            const sideZ = tangent.x;

            for (let j = 0; j < cols; j++) {
                const across = j / this._widthSegments;
                const offset = (across - 0.5) * this._width;

                const x = center.x + sideX * offset;
                const z = center.z + sideZ * offset;
                const height = this._terrains.getHeightAt(
                    vec2.fromValues(x, z)
                );

                if (height === undefined || !Number.isFinite(height)) {
                    return;
                }
            }
        }

        this.buildGeometry(curve);
    };

    private buildGeometry(curve: THREE.CatmullRomCurve3) {
        const rows = this._samples + 1;
        const cols = this._widthSegments + 1;

        const center = new THREE.Vector3();
        const tangent = new THREE.Vector3();

        this._curve = curve;
        this._length = curve.getLength();
        let lastHeight = undefined;

        for (let i = 0; i < rows; i++) {
            const u = i / this._samples;

            curve.getPointAt(u, center);
            curve.getTangentAt(u, tangent);

            tangent.y = 0;
            tangent.normalize();

            const sideX = -tangent.z;
            const sideZ = tangent.x;

            for (let j = 0; j < cols; j++) {
                const across = j / this._widthSegments;
                const offset = (across - 0.5) * this._width;
                const v = i * cols + j;

                const x = center.x + sideX * offset;
                const z = center.z + sideZ * offset;
                const height = this._terrains.getHeightAt(
                    vec2.fromValues(x, z)
                );

                if (height === undefined || !Number.isFinite(height)) {
                    this._isReady = false;
                    return;
                }
                if (lastHeight === undefined) {
                    lastHeight = height;
                }
                else {
                    lastHeight += (height - lastHeight) * this._smoothness;
                }

                this._positions[v * 3] = x;
                this._positions[v * 3 + 1] = lastHeight + this._yOffset;
                this._positions[v * 3 + 2] = z;

                this._uv[v * 2] = across;
                this._uv[v * 2 + 1] =
                    (u * this._length) / this._uvScale;
            }
        }

        this._isReady = true;
        this._events.emit('ready');
    }

    private buildIndices(vertexCount: number) {
        const count = this._samples * this._widthSegments * 6;

        const indices =
            vertexCount > 65535
                ? new Uint32Array(count)
                : new Uint16Array(count);

        const cols = this._widthSegments + 1;
        let k = 0;

        for (let i = 0; i < this._samples; i++) {
            for (let j = 0; j < this._widthSegments; j++) {
                const a = i * cols + j;
                const b = a + 1;
                const c = a + cols;
                const d = c + 1;

                indices[k++] = a;
                indices[k++] = b;
                indices[k++] = c;

                indices[k++] = b;
                indices[k++] = d;
                indices[k++] = c;
            }
        }

        return indices;
    }
}
