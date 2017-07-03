export class World {

  horizontal: number;
  vertical: number;
  tiles: any;

  constructor(horizontal, vertical) {
    this.horizontal = horizontal;
    this.vertical = vertical;
    this.tiles = [];
    for (let i = 0; i < vertical; i++) {
      const arr = [];
      for (let j = 0; j < horizontal; j++) {
        arr.push({ char: ' ', player: false });
      }
      this.tiles.push(arr);
    }
    for (let i = 0; i < 12; i++) {
      this.putMountains();
    }
  }

  private putMountains() {
    const pos = this.getRandomPosition();
    this.tiles[pos.y][pos.x].char = '_';
    const hor = Math.random() < 0.5;
    for (let i = 0; i < 10; ++i) {
      if (Math.random() < 0.8) {
        if (hor) {
          ++pos.x;
        } else {
          ++pos.y;
        }
      }
      const rand = Math.random();
      if (rand < 0.25) {
        if (hor) {
          ++pos.y;
        } else {
          ++pos.x;
        }
      } else if (rand < 0.5) {
        if (hor) {
          --pos.y;
        } else {
          --pos.x;
        }
      }
      if (this.isValidPosition(pos.x, pos.y)) {
        this.tiles[pos.y][pos.x].char = '_';
      }
    }
  }

  private isValidPosition(x, y) {
    if (x < 0 || x >= this.horizontal) {
      return false;
    } else if (y < 0 || y >= this.vertical) {
      return false;
    } else {
      return true;
    }
  }

  public isObstacle(x, y) {
    return this.tiles[y][x].char === '_';
  }

  public isEnemyTerritory(x, y, char) {
    let possibleChar = [ '1', '2', '3', '4' ];
    possibleChar.splice( possibleChar.indexOf(char), 1);
    return possibleChar.indexOf(this.tiles[y][x].char) !== -1;
  }

  public getRandomPosition() {
    return {
      x: this.randomIntFromInterval(0, this.horizontal - 1),
      y: this.randomIntFromInterval(0, this.vertical - 1)
    };
  }

  private randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  public setPlayerInPosition(code, x, y) {
    this.tiles[y][x] = { char: code, player: true };
  }

  public setPlayerInPositionInitial(code, x, y) {
    this.tiles[y][x] = { char: code, player: true };
    this.clearArea(x, y);
  }

  public clearPosition(x, y) {
    this.tiles[y][x].player = false;
  }

  private clearArea(x, y) {
    for (let i = -3; i <= 3; ++i) {
      for (let j = -3; j <= 3; ++j) {
        const posx = x + j;
        const posy = y + i;
        if (this.isValidPosition(posx, posy)) {
          if ((posx !== x) || (posy !== y)) {
            if (!this.tiles[posy][posx].player) {
              this.tiles[posy][posx].char = ' ';
            }
          }
        }
      }
    }
  }
}
