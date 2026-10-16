import type { Scene } from "three";
import { View } from "../view";
import { CSS3DObject } from "three/examples/jsm/Addons.js";
import { State } from "../../state/state";
import type { Time } from "../../state/time";

export interface MenuConf {
    MenuSpeed: number;

}
export class Menu {

    private _menu: CSS3DObject;
    private _menuHtml!: HTMLElement;
    private _scene: Scene;
    private _time: Time;

    private _isOpen: boolean = false;

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

        const menuTitle = document.createElement('div');
        menuTitle.innerText = 'Menu';
        menuTitle.style.padding = '3px 3px 3px 12px';
        menuTitle.style.backgroundColor = 'black';
        menuTitle.style.color = 'white';
        menuTitle.style.fontSize = '5px';
        menuTitle.style.borderRadius = '2px';
        menuTitle.style.textAlign = 'center';
        menuTitle.style.transition = 'transform 0.2s ease 0s';


        const menuTitleObj = new CSS3DObject(menuTitle);
        menuTitleObj.position.set(0, 5, 0);
        menuTitleObj.scale.set(0, 0, 0);

        this._scene.add(menuTitleObj);



        menuIcon.style.width = '15px';
        menuIcon.style.height = '15px';
        menuIcon.style.backgroundColor = 'white';
        menuIcon.style.border = '3px solid black';
        menuIcon.style.cursor = 'pointer';
        menuIcon.style.transition = 'transform 0.2s ease 0s';
        this._menuHtml = menuIcon;

        const menuLogo = document.createElement('i');
        menuLogo.classList.add('fa-solid');
        menuLogo.classList.add('fa-forward');
        menuLogo.style.width = '15px';
        menuLogo.style.height = '15px';
        menuLogo.style.transition = 'transform 0.2s ease 0s';
        menuLogo.style.zIndex = '200';


        const menuLogoObj = new CSS3DObject(menuLogo);
        menuLogoObj.position.set(0, 5, 0);
        menuLogoObj.scale.set(0, 0, 0);

        menuIcon.appendChild(menuLogo);

        this._scene.add(menuLogoObj);




        const menuObj = new CSS3DObject(menuIcon);
        menuObj.position.set(0, 5, 0);
        menuObj.scale.set(.1, .1, .1);
        menuObj.rotateZ(-Math.PI / 4);

        console.log(menuObj);
        this._scene.add(menuObj);


        const menuElements = [menuIcon, menuLogo, menuTitle];
        let closeTimeout: ReturnType<typeof setTimeout> | undefined;
        let titleTimeout: ReturnType<typeof setTimeout> | undefined;
        const openMenu = () => {
            this._isOpen = true;
            if (closeTimeout !== undefined) {
                clearTimeout(closeTimeout);
                closeTimeout = undefined;
            }
            menuObj.scale.set(0.15, 0.15, 0.15);
            menuLogoObj.scale.set(.04, .04, .04);
            if (titleTimeout === undefined && menuTitleObj.scale.x === 0) {
                // wait the delay 
                titleTimeout = setTimeout(() => {
                    titleTimeout = undefined;
                    menuTitleObj.position.x = 2;
                    menuTitleObj.scale.set(0.15, 0.15, 0.15);
                }, 250);
            }
        };
        const closeMenu = () => {
            this._isOpen = false;
            closeTimeout = undefined;
            if (titleTimeout !== undefined) {
                clearTimeout(titleTimeout);
                titleTimeout = undefined;
            }
            menuObj.scale.set(0.1, 0.1, 0.1);
            menuTitleObj.position.x = 0;
            menuTitleObj.scale.set(0, 0, 0);
            menuLogoObj.scale.set(0, 0, 0);
        };
        const deferCloseMenu = (event: PointerEvent) => {
            const nextTarget = event.relatedTarget;
            if (nextTarget instanceof Node && menuElements.some(element =>
                element === nextTarget || element.contains(nextTarget)
            )) {
                return;
            }

            if (closeTimeout !== undefined) {
                clearTimeout(closeTimeout);
            }
            closeTimeout = setTimeout(closeMenu, 300);
        };

        for (const element of menuElements) {
            element.addEventListener('pointerenter', openMenu);
            element.addEventListener('pointerleave', deferCloseMenu);
            element.addEventListener('click',this.showInfos);
        }

        return menuObj;

    }
    public showInfos(){

    }
    public animate() {

    }
    public update() {
        this.animate();
    }


};