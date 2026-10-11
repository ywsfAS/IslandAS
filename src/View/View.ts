import * as THREE from 'three';
import { Camera } from './camera/camera';
import { Renderer } from './renderer/renderer';
import { Player } from './player/player';
import { Grass } from './grass/grass';
import { Terrains } from './terrains/terrains';
import { Sun } from './sun/sun';
export class View {

    private static instance: View;

    private readonly _scene: THREE.Scene;
    private readonly _camera: Camera;
    private readonly _renderer: Renderer;

    private readonly _player: Player;
    private readonly _grass: Grass;
    private readonly _terrains: Terrains;
    private readonly _sun: Sun;

    public static getInstance(): View {
        return View.instance ?? new View();
    }

    private constructor() {
        View.instance = this;

        this._scene = new THREE.Scene();
        this._camera = new Camera(new THREE.PerspectiveCamera());
        this._renderer = new Renderer();
        this._player = new Player();
        this._terrains = new Terrains();

        this._sun = new Sun();
        this._grass = new Grass();
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

    public update() {
        this._grass.update();
        this._sun.update();
        this._terrains.update();
        this._player.update();
        this._camera.update();
        this._renderer.update();
    }
    public resize() {
        this._camera.resize();
        this._renderer.resize();
    }

}