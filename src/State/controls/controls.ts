import { Vector2 } from "three";
import { KEYS } from "./default";
import { EventEmitter } from 'events';

export type Cursor = {
    down: boolean;
    curr: Vector2;
    origin: Vector2;
}
export class Controls {
    private readonly _keys = KEYS;
    private readonly _down: Record<string, boolean> = {};
    private readonly _events = new EventEmitter();
    private readonly _cursor: Cursor;

    constructor() {

        this._cursor = {
            down: false,
            curr: new Vector2(),
            origin: new Vector2()
        }

        this.resetKeysDown();
        this.listen();
    }
    get events(): Readonly<EventEmitter> {
        return this._events;
    }
    get down() {
        return this._down;
    }
    get cursor() {
        return this._cursor;
    }

    private resetKeysDown(): void {

        for (let item of this._keys) {
            this._down[item.name] = false;
        }

    }

    public findByCode(code: string) {
        return this._keys.find((item) => item.codes.includes(code));
    }
    private listen() {

        window.addEventListener('keydown', (event) => this.onKeyDown(event));
        window.addEventListener('keyup', (event) => this.onkeyUp(event));
        window.addEventListener('pointerdown', () => this.onCursorDown());
        window.addEventListener('pointerup', () => this.onCursorUp());
        window.addEventListener('pointermove', (event) => this.onCursorMove(event))

    }
    private onKeyDown(event: KeyboardEvent): void {

        const item = this.findByCode(event.code);
        if (item) {

            this._events.emit(`${item.name}Down`);
            this._down[item.name] = true;
        }

    }
    private onkeyUp(event: KeyboardEvent): void {

        const item = this.findByCode(event.code);
        if (item) {

            this._events.emit(`${item.name}Up`);
            this._down[item.name] = false;
        }
    }
    private onCursorDown(): void {
        this._cursor.down = true
    }
    private onCursorUp(): void {
        this._cursor.down = false;
    }
    private onCursorMove(event: PointerEvent): void {
        this._cursor.curr.x += event.movementX;
        this._cursor.curr.y += event.movementY;
    }
    public update(): void {
        this._cursor.origin.x = this._cursor.curr.x
        this._cursor.origin.y = this._cursor.curr.y

        this._cursor.curr.x = 0
        this._cursor.curr.y = 0
    }




}