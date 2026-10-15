import * as THREE from 'three';
import { Camera } from './camera/camera';
import { Renderer } from './renderer/renderer';
import { Player } from './player/player';
import { Grass } from './grass/grass';
import { Terrains } from './terrains/terrains';
import { Sun } from './sun/sun';
import { Water } from './water/water';
import { Sky } from './sky/sky';
import { Stand } from './stand/stand';
import { cssRenderer } from './cssRenderer/cssRenderer';
import { Menu } from './menu/menu';
export class View {

    private static instance: View;

    private readonly _scene: THREE.Scene;
    private readonly _camera: Camera;
    private readonly _renderer: Renderer;
    private readonly _cssRenderer: cssRenderer;

    private readonly _player: Player;
    private readonly _grass: Grass;
    private readonly _terrains: Terrains;
    private readonly _sun: Sun;
    private readonly _water: Water;
    private readonly _sky: Sky;
    private readonly _stand: Stand;
    private readonly _menu : Menu;

    public static getInstance(): View {
        return View.instance ?? new View();
    }

    private constructor() {
        View.instance = this;

        this._scene = new THREE.Scene();
        this._camera = new Camera(new THREE.PerspectiveCamera());
        this._renderer = new Renderer();
        this._cssRenderer = new cssRenderer();
        this._player = new Player();
        this._terrains = new Terrains();

        this._sun = new Sun();
        this._sky = new Sky(this._scene, this._camera.instance, this._sun);
        this._grass = new Grass();
        this._water = new Water();
        this._stand = new Stand();
        this._menu = new Menu();

        console.log("view", this._terrains);
    }
    get scene() {
        return this._scene;
    }
    get camera() {
        return this._camera;
    }
    get renderer() {
        return this._renderer;
    }
    get cssRenderer() {
        return this._cssRenderer;
    }
    get player() {
        return this._player;
    }
    get terrains() {
        return this._terrains;
    }
    get grass() {
        return this._grass;
    }
    get sun() {
        return this._sun;
    }
    get water() {
        return this._water;
    }
    get stand() {
        return this._stand;
    }

    public update() {
        this._water.update();
        this._grass.update();
        this._sun.update();
        this._terrains.update();
        this._player.update();
        this._camera.update();
        this._stand.update();
        this._sky.update();
        this._menu.update();
        this._cssRenderer.update();
        this._renderer.update();
    }
    public resize() {
        this._camera.resize();
        this._renderer.resize();
    }

}