import type { PlayerOptions, Position } from './types';
import { Vector3 } from 'three'

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
    position: defaultPosition


}