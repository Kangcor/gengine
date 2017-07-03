export class Game {
  turn: number;
  endTurn: number;

  constructor(endTurn = 100) {
    this.turn = 0;
    this.endTurn = endTurn;
  }

  nextTurn() {
    ++this.turn;
  }

  gameEnded() {
    return this.turn >= this.endTurn;
  }
}
