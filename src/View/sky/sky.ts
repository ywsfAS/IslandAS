import * as THREE from 'three';
import type { Sun } from '../sun/sun';
import { createSkyMaterial } from '../materials/skyMaterial';
import { createStarsMaterial } from '../materials/starsMaterial';

export class Sky {

    private readonly _mesh: THREE.Mesh;
    private readonly _material: THREE.ShaderMaterial;
    private readonly _stars: THREE.Points;
    private readonly _starsMaterial: THREE.ShaderMaterial;

    constructor(
        private readonly _scene: THREE.Scene,
        private readonly _camera: THREE.Camera,
        private readonly _sun: Sun,
    ) {
        this._material = createSkyMaterial();
        this._mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 16), this._material);
        this._mesh.frustumCulled = false;
        this._mesh.renderOrder = -1;

        this._starsMaterial = createStarsMaterial();
        this._stars = this.addStars(this._starsMaterial);

        this._scene.add(this._mesh);
        this._scene.add(this._stars);
        this.update();
    }
    public addStars(material = createStarsMaterial()): THREE.Points {
        const starsCount = 1000;
        const outerRadius = 100;

        const positions = new Float32Array(starsCount * 3);
        const sizes = new Float32Array(starsCount);
        const colors = new Float32Array(starsCount * 3);
        for (let i = 0; i < starsCount; i++) {
            const index = i * 3;

            const position = new THREE.Vector3();
            position.setFromSphericalCoords(outerRadius, Math.PI * Math.random() * 0.5, 2 * Math.PI * Math.random());

            positions[index] = position.x;
            positions[index + 1] = position.y;
            positions[index + 2] = position.z;

            sizes[i] = 1.0 + Math.random() * 1.5;

            const color = new THREE.Color();
            color.setHSL(Math.random(), 1, 0.5 + Math.random() * 0.5)

            colors[index] = color.r;
            colors[index + 1] = color.g;
            colors[index + 2] = color.b;


        }


        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('aColor', new THREE.Float32BufferAttribute(colors, 3));
        geometry.setAttribute('aSize', new THREE.Float32BufferAttribute(sizes, 1));

        const points = new THREE.Points(geometry, material);
        points.frustumCulled = false;
        points.renderOrder = 1;

        return points;

    }

    public update() {
        this._mesh.position.copy(this._camera.position);
        this._stars.position.copy(this._camera.position);
        this._material.uniforms.uSunDirection.value.copy(this._sun.lightDirection);
        this._starsMaterial.uniforms.uStarBrightness.value =
            1 - THREE.MathUtils.smoothstep(this._sun.lightDirection.y, -0.12, 0.18) + 0.1;
    }
}
