import { Time } from "./Time";
export class State {
    public static instance: State;

    public time! : Time;

    public static getInstance(): State {
        return State.instance;
    };

    constructor() {
        if (State.instance) {
            return State.instance;
        }

        State.instance = this;

        this.time = new Time();






    }










}