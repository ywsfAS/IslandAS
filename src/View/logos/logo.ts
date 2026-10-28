import * as THREE from 'three';
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';
import { View } from '../view';
import { createLogoMaterial } from '../materials/logoMaterial';
import type { Sun } from '../sun/sun';
import type { LogoOptions } from './types';
import { LogoHoverCard } from './hoverCard';
import type { TerrainState } from '../../state/terrain/terrain';
import { vec2 } from 'gl-matrix';
import type { TerrainsState } from '../../state/terrains/terrains';
import { State } from '../../state/state';
import type { AudioManager } from '../../state/audio/audioManager';

export abstract class Logo {
    protected readonly _scene: THREE.Scene;
    protected readonly _sun: Sun;
    protected readonly _camera: THREE.Camera;
    protected readonly _options: LogoOptions;
    protected readonly _materials: THREE.ShaderMaterial[] = [];
    protected _hoverCard?: LogoHoverCard;
    protected readonly _terrains: TerrainsState;
    protected readonly _audio: AudioManager;

    protected constructor(
        defaults: LogoOptions,
        options: Partial<Omit<LogoOptions, 'asset'>> = {},
    ) {
        const state = State.getInstance();
        const view = View.getInstance();
        this._audio = state.audioManager;

        this._terrains = state.Terrains;
        this._scene = view.scene;
        this._sun = view.sun;
        this._camera = view.camera.instance;
        this._options = {
            ...defaults,
            ...options,
            position: options.position?.clone() ?? defaults.position.clone(),
        };

        this.load().catch((error: unknown) => {
            console.error(`Failed to load logo: ${this._options.asset}`, error);
        });
    }

    private async load(): Promise<void> {
        const data = await new SVGLoader().loadAsync(this._options.asset);
        const paths = data.paths.map(path => ({
            color: path.color,
            shapes: path.toShapes(),
        }));
        const shapes = paths.flatMap(path => path.shapes);

        if (shapes.length === 0) {
            throw new Error(`SVG contains no filled shapes: ${this._options.asset}`);
        }

        const boundsGeometry = new THREE.ShapeGeometry(shapes);
        boundsGeometry.computeBoundingBox();
        const bounds = boundsGeometry.boundingBox;
        boundsGeometry.dispose();

        if (!bounds || bounds.isEmpty()) {
            throw new Error(`Unable to determine SVG dimensions: ${this._options.asset}`);
        }

        const sourceHeight = bounds.getSize(new THREE.Vector3()).y;
        if (sourceHeight === 0) {
            throw new Error(`SVG has zero height: ${this._options.asset}`);
        }

        const scale = this._options.height / sourceHeight;
        const group = new THREE.Group();

        for (const [pathIndex, path] of paths.entries()) {
            for (const shape of path.shapes) {
                const geometry = new THREE.ExtrudeGeometry(shape, {
                    depth: this._options.depth,
                    steps: 1,
                    bevelEnabled: false,
                });
                geometry.scale(scale, scale, 1);
                geometry.translate(0, 0, -pathIndex * this._options.layerSpacing);

                const material = createLogoMaterial(path.color);
                this._materials.push(material);

                const mesh = new THREE.Mesh(geometry, material);
                mesh.castShadow = true;
                group.add(mesh);
            }
        }

        const groupBounds = new THREE.Box3().setFromObject(group);
        const center = groupBounds.getCenter(new THREE.Vector3());
        const size = groupBounds.getSize(new THREE.Vector3()).distanceTo(center);
        group.children.forEach(child => child.position.sub(center));

        group.rotateX(-Math.PI);
        const position = vec2.fromValues(this._options.position.x, this._options.position.z);

        const cardPosition = group.position.clone();
        const placeOnTerrain = (state: TerrainState) => {
            if (!state.contains(position)) return;

            const height = state.getHeight(position);

            if (height === undefined) return;

            group.position.set(
                this._options.position.x,
                height + size / 2,
                this._options.position.z
            );
            cardPosition.y = this._options.height + height + 3;
            cardPosition.x += group.position.x;
            this._scene.add(group);

            cardPosition.z += this._options.depth;
            const hoverCard = new LogoHoverCard(
                this._scene,
                this._options.interaction,
                cardPosition,
            );

            this._hoverCard = hoverCard;
            View.getInstance().raycaster.subscribe(
                group,
                intersection => {
                    const hovered = intersection !== null;
                    this.setHovered(hovered);
                    if (hovered) {
                        hoverCard.show();
                    } else {
                        hoverCard.hide();
                    }
                    this.onHover(hovered);
                },
                this._options.interaction.id,
            );
        };

        this._terrains.events.on('create', (state: TerrainState) => {
            if (state.contains(position)) {
                state.events.on('ready', () => {
                    placeOnTerrain(state);
                });
            }
        });


    }

    public update(): void {
        for (const material of this._materials) {
            material.uniforms.uLightDirection.value = this._sun.lightDirection;
            material.uniforms.uSunColor.value = this._sun.color;
            material.uniforms.uSunIntensity.value = this._sun.intensity;
            material.uniforms.uCameraPosition.value.copy(this._camera.position);
        }
        this._hoverCard?.update();
    }

    protected setHovered(hovered: boolean): void {
        for (const material of this._materials) {
            material.uniforms.uHover.value = hovered ? 1 : 0;
        }
        this._audio.play("/audio/click.mp3");
    }

    protected onHover(_hovered: boolean): void { }
}
