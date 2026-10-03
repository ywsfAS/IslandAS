import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


export class Game {
    private _scene: THREE.Scene;
    private _camera: THREE.PerspectiveCamera;
    private _renderer: THREE.WebGLRenderer;
    private _controles: OrbitControls;

    constructor(width: number, height: number, canvaId: string) {

        const aspect = width / height;
        const app = document.getElementById(canvaId) as HTMLCanvasElement;

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(
            10,
            aspect,
            0.1,
            100
        );

        camera.position.z = 20;

        scene.add(camera);
        const renderer = new THREE.WebGLRenderer({
            canvas: app
        })

        renderer.setSize(width, height);

        const controls = new OrbitControls(
            camera,
            renderer.domElement
        );

        controls.enableDamping = true;
        controls.dampingFactor = 0.05;


        this._scene = scene;
        this._camera = camera;
        this._renderer = renderer;
        this._controles = controls;

        this.Update = this.Update.bind(this);
        this.OnResize = this.OnResize.bind(this);

        window.addEventListener('resize', this.OnResize);
    }

    public Run(): void {
        console.log("game is starting ...");
        this.Update();
    }
    private Update(): void {
        this._controles.update();
        this._renderer.render(this._scene, this._camera);

        requestAnimationFrame(this.Update);
    }

    private OnResize() {
        const { innerWidth, innerHeight } = window;

        this._camera.aspect = innerWidth / innerHeight;
        this._camera.updateProjectionMatrix();

        this._renderer.setSize(innerWidth, innerHeight);
    }

}