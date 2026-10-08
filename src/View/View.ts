import * as THREE from 'three';
import { Camera } from './camera/camera';
import { Renderer } from './renderer/renderer';
import { Player } from './player/player';
import { World } from './world/world';
import { Grass } from './grass/grass';
export class View {

    private static instance: View;

    private readonly _scene: THREE.Scene;
    private readonly _camera: Camera;
    private readonly _renderer: Renderer;

    private readonly _player: Player;
    private readonly _world: World;
    private readonly _grass: Grass;

    public static getInstance(): View {
        return View.instance ?? new View();
    }

    private constructor() {
        View.instance = this;

        this._scene = new THREE.Scene();
        this._camera = new Camera(new THREE.PerspectiveCamera());
        this._renderer = new Renderer();
        this._player = new Player();
        this._world = new World();
        this._grass = new Grass();
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

    public update() {
        this._grass.update();
        this._world.update();
        this._player.update();
        this._camera.update();
        this._renderer.update();
    }
    public resize() {
        this._camera.resize();
        this._renderer.resize();
    }

}