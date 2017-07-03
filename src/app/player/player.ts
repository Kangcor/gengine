export class Player {

  id: string;
  x: number;
  y: number;
  name: string;

  constructor(id) {
    this.id = id;
  }

  public nextRound(world, score, turn, endTurn, x, y) {
    return {x: x, y: y};
  }

  public elementAtPosition(world, x, y) {
    if (x < 0 || x >= world.horizontal) {
      return 'outside horizontal axis';
    } else if (y < 0 || y >= world.vertical) {
      return 'outside vertical axis';
    }
    const elem = world.tiles[y][x];
    if (elem.char === ' ') return 'empty';
    else if (elem.char === '_') return 'mountain';
    else if (elem.char === '1') {
      if (elem.player) return 'player 1';
      else return 'controlled by player 1';
    }
    else if (elem.char === '2') {
      if (elem.player) return 'player 2';
      else return 'controlled by player 2';
    }
    else if (elem.char === '3') {
      if (elem.player) return 'player 3';
      else return 'controlled by player 3';
    }
    else if (elem.char === '4') {
      if (elem.player) return 'player 4';
      else return 'controlled by player 4';
    }
  }
}
