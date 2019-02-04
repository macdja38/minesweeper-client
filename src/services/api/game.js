/* global fetch */
import routes from './routes';

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

export function createGame() {
  return delay(3000)
    .then(() => fetch(routes.games, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    }))
    .then(response => response.json());
}

export function getGame(id) {
  return fetch(routes.game(id))
    .then(response => response.json());
}

export function flag({ id, x, y }) {
  return fetch(routes.flag(id), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ x, y }),
  })
    .then(response => response.json());
}

export function reveal({ id, x, y }) {
  return fetch(routes.reveal(id), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ x, y }),
  })
    .then(response => response.json());
}


global.createGame = createGame();
global.getGame = getGame;
global.flag = flag;
global.reveal = reveal;
