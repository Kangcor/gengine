import {Player} from './player';
import {World} from '../game/world/world';

interface IMovement {
  name: String;
  nextRound(world: World,
            score: {
              '1': { score: number, name: string },
              '2': { score: number, name: string },
              '3': { score: number, name: string },
              '4': { score: number, name: string },
            },
            turn: number,
            endTurn: number,
            x: number,
            y: number
  ):  { x: number, y: number };
}

export class PlayerDumb extends Player implements IMovement {

  name = 'Dumb';

  nextRound(world, score, turn, endTurn, x, y) {
    const value = Math.random();
    if (value < 0.25) {
      return { x: this.x, y: this.y - 1 };
    } else if (value < 0.50) {
      return { x: this.x + 1, y: this.y };
    } else if (value < 0.75) {
      return { x: this.x, y: this.y + 1 };
    } else {
      return { x: this.x - 1, y: this.y };
    }
  }

}
