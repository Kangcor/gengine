import { Component, OnInit } from '@angular/core';
import {Player} from '../player/player';
import {World} from './world/world';
import {ScoreService} from './score/score.service';
import {PlayerDumb} from '../player/player-dumb';
import {Game} from './game';
import {MyPlayer} from '../player/my-player';

@Component({
  selector: 'gen-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  players: Player[];
  world: World;
  game: Game;
  score;
  intervalId;
  worldWidth = 20;
  worldHeight = 20;

  constructor(private scoreService: ScoreService) {}

  ngOnInit() {
    this.scoreService.score.subscribe(
      (score) => this.score = score
    );
  }

  newGame() {
    this.game = new Game();
    this.players = [
      new MyPlayer('1'),
      new PlayerDumb('2'),
      new PlayerDumb('3'),
      new PlayerDumb('4')
    ];

    this.world = new World(this.worldWidth, this.worldHeight);
    for (const player of this.players) {
      const {x, y} = this.world.getRandomPosition();
      player.x = x;
      player.y = y;
    }

    this.putPlayersInMap();
  }

  putPlayersInMap() {
    for (const player of this.players) {
      this.world.setPlayerInPositionInitial(player.id, player.x, player.y);
    }
  }

  gameEnded() {
    if (this.game) return this.game.gameEnded();
    return true;
  }

  nextRound() {
    if (!this.gameEnded()) {
      this.game.nextTurn();
      for (const player of this.players) {
        const nextMove = player.nextRound(this.world, this.score, this.game.turn, this.game.endTurn, player.x, player.y);
        if (this.isValidMove(nextMove, player)) {
          this.movePlayer(nextMove, player);
        }
      }
      this.scoreService.calculateScore(this.world, this.players);
    }
  }

  nextRoundTimes(times) {
    const intervalId = setInterval( () => {
      if (times <= 0) {
        clearInterval(intervalId);
      }
      times--;
      this.nextRound();
    }, 50);
  }

  play(speed: number) {
    clearInterval(this.intervalId);
    this.intervalId = setInterval( () => {
      if (this.gameEnded()) clearInterval(this.intervalId);
      this.nextRound();
    }, speed);
  }

  pause() {
    clearInterval(this.intervalId);
  }

  movePlayer(nextMove, player) {
    this.world.clearPosition(player.x, player.y);
    player.x = nextMove.x;
    player.y = nextMove.y;
    this.world.setPlayerInPosition(player.id, player.x, player.y);
  }

  isValidMove(move, player) {
    if (move.x < 0 || move.y < 0) {
      return false;
    } else if (move.x >= this.world.horizontal) {
      return false;
    } else if (move.y >= this.world.vertical) {
      return false;
    } else if (move.x !== player.x && move.y !== player.y) {
      return false;
    } else if (Math.abs((move.x - player.x) + (move.y - player.y)) > 1) {
      return false;
    } else if (this.world.isObstacle(move.x, move.y)) {
      return false;
    } else if (this.world.isEnemyTerritory(move.x, move.y, player.id)) {
      return false;
    } else {
      return true;
    }
  }

}
