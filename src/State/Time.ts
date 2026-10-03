
export class Time {

    public start: number;
    public current: number;
    public deltaTime: number;
    public elapsedTime: number;

    constructor() {

        this.start = Date.now() / 1000;
        this.current = this.start;

        this.deltaTime = 16 / 1000;
        this.elapsedTime = 0;
    }

    public Update() {

        const current = Date.now() / 1000;

        this.deltaTime = current - this.current;
        this.current = current;
        this.elapsedTime += this.deltaTime;

        // lock in 20 fps
        if (this.deltaTime > 1 / 20) {
            this.deltaTime = 1 / 20
        }

    }







}