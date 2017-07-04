# Gengine

![Juego inicial](http://i.imgur.com/fh3eiag.png "Juego inicial")

Gesco Game Engine

## Como instalar

Si ya tienes instalado `npm en tu ordenador, clona el repositorio en local y ejecuta `npm install`.
Una vez completada la instalación, el comando `npm start` arrancará un servidor al que podrás acceder en la ruta `http://localhost:4200`.

El servidor se actualizará cada vez que haya cambios en el código de forma automática.

## Normas de juego

El tablero de juego está compuesto por un mapa de dimensiones conocidas, sobre el que compiten cuatro jugadores.
La posición inicial de cada jugador es aleatoria, así como una serie de obstáculos que impiden el paso.
Cada turno es posible realizar un movimiento de una unidad en cualquier dirección (vertical u horizontal), al 
desplazarte pintas la superficie sobre la que estás y pasa a ser de tu control. 

No es posible moverse a una zona pintada por un rival, ni tampoco donde haya un obstáculo.

Cada turno se mueven los 4 jugadores, siempre que el movimiento sea válido siguiendo las normas del juego.

La puntuación de cada jugador es la cantidad de posiciones que tiene pintadas de su color.

Al finalizar los turnos decididos al comienzo de la partida, gana el jugador que controla mas posiciones del mapa.

## Como jugar

Para jugar es necesario editar el archivo `gengine/src/app/player/my-player.ts`.
En ese archivo encontraréis mas indicaciones de cual es la función a modificar, que información de entrada hay y el formato de la salida esperada.

Una vez editada la lógica de vuestro jugador (inicialmente ya tiene un comportamiento), podéis ir al navegador
y comenzar a jugar. Se puede ver el cambio cada turno, 10 turnos seguidos o ver la partida de principio a fin según el botón que se pulse.

![Juego tras varios turnos](http://i.imgur.com/lA8MJmR.png "Juego tras varios turnos")

## Funciones disponibles

Para fijar unas normas que se apliquen a todos por igual, queda prohibido modificar cualquier parámetro del juego,
únicamente es posible leer información y emitir una nueva posición en el return de la función.

### elementAtPosition(world, x, y) 

Recibe el objeto `world` y unas coordenadas `x` e `y`.

Las posibles respuestas que puede devolver son: 
* **'outside horizontal axis'**: La posición enviada se sale del mapa por el eje X (horizontal)
* **'outside vertical axis'**: La posición enviada se sale del mapa por el eje Y (vertical)
* **'empty'**: Coordenada vacía
* **'mountain'**: Coordenada con un bloqueo, no es posible acceder a esa posición
* **'player 1'**: Coordenada ocupada por el jugador 1
* **'controlled by player 1'**: Coordenada controlada por el jugador 1
* **'player 2'**: Coordenada ocupada por el jugador 2
* **'controlled by player 2'**: Coordenada controlada por el jugador 2
* **'player 3'**: Coordenada ocupada por el jugador 3
* **'controlled by player 3'**: Coordenada controlada por el jugador 3
* **'player 4'**: Coordenada ocupada por el jugador 4
* **'controlled by player 4'**: Coordenada controlada por el jugador 4

## Consideraciones

Para uso personal se puede modificar todo lo que se desee la plataforma para hacer pruebas o provocar comportamientos
deseados, pero a la hora de competir, se revisará el código de forma manual antes de disputar las rondas con el 
resto de jugadores, siendo descalificados los que usen código fuera de las normas (previo aviso por si se trata de un error).

## Mejoras

Cualquier aporte es bienvenido, puedes ponerte en contacto conmigo para trabajar de forma conjunta o bien enviar una pull request 
para que la añada al repositorio.
Las mejoras de la plataforma serán incluidas en este repositorio para que cualquier persona pueda actualizar 
a la última versión.
