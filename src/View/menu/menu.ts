import type { Scene } from "three";
import { View } from "../view";
import { CSS3DObject } from "three/examples/jsm/Addons.js";
import * as THREE from 'three';
import { Github } from "../logos/github/github";
import { Linkedin } from "../logos/linkedin/linkedin";
import { TypeScriptLogo } from "../logos/typescript/typescript";
import type { Camera } from "../camera/camera";
import type { CameraState } from "../../state/camera/camera";
import { State } from "../../state/state";

export class Menu {

    private _menu: CSS3DObject;
    private _menuHtml!: HTMLElement;
    private _scene: Scene;
    private readonly _logos: [Github, Linkedin, TypeScriptLogo];

    private _isOpen: boolean = false;
    private _infoPanel?: CSS3DObject;
    private readonly _camera: CameraState;

    constructor() {

        const view = View.getInstance();
        const state = State.getInstance();

        this._scene = view.scene;
        this._menu = this.setMenuIcon();

        this._camera = state.camera;

        this._logos = [
            new Github(),
            new Linkedin(),
            new TypeScriptLogo(),
        ];
    }
    public setMenuIcon(): CSS3DObject {
        console.log("set menu icon");
        const menuIcon = document.createElement('div');

        const menuTitle = document.createElement('div');
        menuTitle.innerText = 'Controls';
        menuTitle.style.padding = '3px 3px 3px 16px';
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
            element.addEventListener('click', () => this.showInfos());
        }

        return menuObj;

    }
    public showInfos() {

        if (this._infoPanel) {
            this._scene.remove(this._infoPanel);
            this._infoPanel = undefined;
            return;
        }

        const panel = document.createElement('section');

        Object.assign(panel.style, {
            width: '300px',
            padding: '14px',
            borderRadius: '8px',
            backgroundColor: 'white',
            color: '#263238',
            fontFamily: '"Nunito", sans-serif',
            fontSize: '13px',
        })

        const header = document.createElement('div');

        Object.assign(header.style, {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
        })
        const closeBtn = document.createElement('button');
        closeBtn.innerText = 'X';
        Object.assign(closeBtn.style, {
            cursor: 'pointer',
            backgroundColor: 'transparent',
            outline: 'none',
            border: 'none'
        })


        const title = document.createElement('h2');
        title.innerText = 'IslandAS Controls';
        Object.assign(title.style, {
            margin: '0',
            fontSize: '16px',
            fontWeight: '600',
        });

        header.append(title, closeBtn);

        const intro = document.createElement('p');
        intro.textContent = 'Use these controls to move around and explore the island.';
        Object.assign(intro.style, {
            margin: '8px 0 12px',
            color: '#60717d',
            fontSize: '12px',
            lineHeight: '1.4',
        });

        const list = document.createElement('ul');
        Object.assign(list.style, {
            display: 'grid',
            gap: '6px',
            margin: '0',
            padding: '0',
            listStyle: 'none',
        });

        const controlsList: Record<string, string>[] = [
            { name: "Forward", key: "W / Arrow Up", code: "KeyW" },
            { name: "Back", key: "S / Arrow Down", code: "KeyS" },
            { name: "Left", key: "A / Arrow Left", code: "KeyA" },
            { name: "Right", key: "D / Arrow Right", code: "KeyD" },
            { name: "Jump", key: "Space", code: "Space" },
            { name: "Boost", key: "Shift", code: "ShiftLeft" }
        ];

        for (let i = 0; i < controlsList.length; i++) {
            const control = controlsList[i];
            const li = document.createElement('li');

            Object.assign(li.style, {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                padding: '7px 9px',
                borderRadius: '5px',
                backgroundColor: '#f1f4f6',
            });
            const name = document.createElement('div');
            name.textContent = control.name;

            const key = document.createElement('div');
            key.textContent = control.key;
            Object.assign(key.style, {
                color: '#60717d',
                fontSize: '12px',
                textAlign: 'right',
            });

            li.append(name, key);
            list.append(li);

        }

        panel.append(header, intro, list);

        const panelObject = new CSS3DObject(panel);

        panelObject.position.set(0, 13, 0);
        panelObject.scale.set(0.03, 0.03, 0.03);


        this._infoPanel = panelObject;
        this._scene.add(panelObject);

        closeBtn.addEventListener('click', () => {
            console.log("here is infopael", this._infoPanel);
            if (this._infoPanel) {
                this._scene.remove(panelObject);
            };
            this._infoPanel = undefined;
        });
    }
    public animate() {

    }
    public update() {
        this._logos.forEach(logo => logo.update());
        this.animate();
        const [qx, qy, qz, qw] = this._camera.quaterion;
        this._infoPanel?.quaternion.set(qx, qy, qz, qw);
    }


};