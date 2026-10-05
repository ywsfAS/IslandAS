import type { Vector3 } from "three";

export interface PlayerOptions {
    rotation: number,
    normalAcceleration: number,
    boostAcceleration: number,
    speed: number,

    position: Position

}

export type Position = {
    cur: Vector3,
    prev: Vector3,
    delta: Vector3
}