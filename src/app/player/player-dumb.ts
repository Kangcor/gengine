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

  world: World;

  /*
   Implementa la logica de tu jugador utilizando únicamente las funciones descritas en la documentación.
   Las funciones disponibles están siempre en el objeto 'this', heredadas de la clase Player.
   Debes retornar un objeto los atributos 'x' e 'y', por ejemplo { x: 20, y: 15}.
   Si tu movimiento no es válido por estar fuera de los márgenes, en un obstáculo, o en terreno enemigo tu
   jugador no se moverá.
   El objeto world tiene los atributos 'horizontal' y 'vertical', que representan el número de tiles que tiene el mapa
   en cada uno de los ejes.
   El objeto score representa la puntuación de cada uno de los jugadores, indicando su ID, nombre y puntuación. La puntuación
   se define en función del número de tiles que controla cada jugador.
   Los parámetros turn y endTurn representan el turno actual y el turno en el que finaliza la partida, respectivamente.
   Este jugador de ejemplo mira las posiciones adyacentes y se mueve a la primera que ve vacía, en caso de no encontrar
   ninguna hace un movimiento aleatorio a una de ellas.
   */
  nextRound(world, score, turn, endTurn, x, y) {
    this.world = world;
    let pos = this.checkAdyacentes(x, y);
    if (pos) return pos;
    pos = this.checkDiagonal(x, y);
    if (pos) return pos;
    return this.randomMovement(x, y);
  }
  checkAdyacentes(x, y) {
    if (this.elementAtPosition(this.world, x - 1, y) === 'empty') {
      return { x: x - 1, y: y };
    }
    if (this.elementAtPosition(this.world, x, y - 1) === 'empty') {
      return { x: x, y: y - 1 };
    }
    if (this.elementAtPosition(this.world, x + 1, y) === 'empty') {
      return { x: x + 1, y: y };
    }
    if (this.elementAtPosition(this.world, x, y + 1) === 'empty') {
      return { x: x, y: y + 1 };
    }
    return null;
  }
  checkDiagonal(x, y) {
    let dx, dy;
    dx = x - 1;
    dy = y - 1;
    if (this.isEmpty(dx, dy)) {
      if (this.isEmptyOrMine(x - 1, y)) {
        return { x: x - 1, y: y };
      } else if (this.isEmptyOrMine(x, y - 1)) {
        return { x: x, y: y - 1};
      }
    }
    dx = x + 1;
    dy = y - 1;
    if (this.isEmpty(dx, dy)) {
      if (this.isEmptyOrMine(x + 1, y)) {
        return { x: x + 1, y: y };
      } else if (this.isEmptyOrMine(x, y - 1)) {
        return { x: x, y: y - 1};
      }
    }
    dx = x - 1;
    dy = y + 1;
    if (this.isEmpty(dx, dy)) {
      if (this.isEmptyOrMine(x - 1, y)) {
        return { x: x - 1, y: y };
      } else if (this.isEmptyOrMine(x, y + 1)) {
        return { x: x, y: y + 1};
      }
    }
    dx = x + 1;
    dy = y + 1;
    if (this.isEmpty(dx, dy)) {
      if (this.isEmptyOrMine(x + 1, y)) {
        return { x: x + 1, y: y };
      } else if (this.isEmptyOrMine(x, y + 1)) {
        return { x: x, y: y + 1};
      }
    }
    return null;
  }
  isEmptyOrMine(x, y) {
    const pos =  this.elementAtPosition(this.world, x, y);
    return (pos === 'empty' || pos === 'controlled by player 1');
  }
  isEmpty(x, y) {
    return this.elementAtPosition(this.world, x, y) === 'empty';
  }
  randomMovement(x, y) {
    const value = Math.random();
    if (value < 0.25) {
      return { x: x, y: y - 1 };
    } else if (value < 0.50) {
      return { x: x + 1, y: y };
    } else if (value < 0.75) {
      return { x: x, y: y + 1 };
    } else {
      return { x: x - 1, y: y };
    }
  }
}