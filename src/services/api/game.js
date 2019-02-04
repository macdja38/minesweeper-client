/* global fetch */
import routes from './routes';

export function createGame() {
  return fetch(routes.games, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  })
    .then(response => response.json());
}

export function getGame(id) {
  return fetch(routes.game(id))
    .then(response => response.json());
}

function action(route, { x, y }) {
  return fetch(route, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ x, y }),
  })
    .then((response) => {
      if (response.ok === true) {
        return response.json();
      }
      return response.json().then((json) => {
        throw new Error(json.status);
      });
    });
}

export function flag({ id, x, y }) {
  return action(routes.flag(id), { x, y });
}

export function reveal({ id, x, y }) {
  return action(routes.reveal(id), { x, y });
}
