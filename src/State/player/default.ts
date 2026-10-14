import type { PlayerOptions, Position } from './types';
import { Vector3 } from 'three'

export const PLAYER_RADIUS = 1;
export const PLAYER_CAPSULE_LENGTH = 1;

const defaultPosition: Position = {
    cur: new Vector3(0, 0, 0),
    prev: new Vector3(0, 0, 0),
    delta: new Vector3(0, 0, 0)
}

export const DEFAULT_PLAYER_OPTIONS: PlayerOptions = {
    rotation: 0,
    normalAcceleration: 10,
    boostAcceleration: 30,
    speed: 0,
    jumpPower: 20,
    minHeight: 0.1,
    maxHeight: 5,
    position: defaultPosition


};
export const VERTICAL_EASE_SPEED = 10;
export const PLAYER_ROTATION_SPEED = Math.PI;

export function easeTowards(current: number, target: number, deltaTime: number): number {
    const amount = 1 - Math.exp(-VERTICAL_EASE_SPEED * deltaTime);
    return current + (target - current) * amount;
}