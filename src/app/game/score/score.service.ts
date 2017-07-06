import {EventEmitter, Injectable} from '@angular/core';

class Score {
  score: number;
  name: string;
}

@Injectable()
export class ScoreService {

  public score = new EventEmitter<any>();

  constructor() { }

  public calculateScore(world, players) {
    const count = {
      '1': { score: 0, name: 'Player1' },
      '2': { score: 0, name: 'Player2' },
      '3': { score: 0, name: 'Player3' },
      '4': { score: 0, name: 'Player4' }
    };
    for (const char in count) {
      if (count.hasOwnProperty(char)) {
        const player = players.find( p => p.id === char );
        if (player.name) {
          count[char].name = player.name;
        }
      }
    }
    for (const row of world.tiles) {
      for (const tile of row) {
        if (tile.char !== ' ' && tile.char !== '_') {
          count[tile.char].score++;
        }
      }
    }
    this.score.emit(count);
  }

}
