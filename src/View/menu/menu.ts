import type { Scene } from "three";
import { View } from "../view";
import { CSS3DObject } from "three/examples/jsm/Addons.js";
import { State } from "../../state/state";
import type { Time } from "../../state/time";

export interface MenuConf {

}
export class Menu {

    private _menu: CSS3DObject;
    private _scene: Scene;
    private _time: Time;

    constructor() {

        const view = View.getInstance();
        const state = State.getInstance();

        this._scene = view.scene;
        this._time = state.time;


        this._menu = this.setMenuIcon();
    }
    public setMenuIcon(): CSS3DObject {
        console.log("set menu icon");
        const menuIcon = document.createElement('div');


        menuIcon.style.width = '20px';
        menuIcon.style.height = '20px';
        menuIcon.style.borderRadius = '3px';
        menuIcon.style.top = '0';
        menuIcon.style.backgroundColor = 'white';

        const menuObj = new CSS3DObject(menuIcon);
        menuObj.position.set(0, 5, 0);
        menuObj.scale.set(0.1, 0.1, 0.1);
        menuObj.rotateZ(-Math.PI / 4);

        console.log(menuObj);
        this._scene.add(menuObj);
        return menuObj;

    }
    public animate() {
        this._menu.rotation.z += 2 * this._time.deltaTime;

    }
    public update() {
        this.animate();
    }


};