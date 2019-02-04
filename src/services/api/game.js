/* global fetch */
import routes from './routes';

export function createGame({ width, height }) {
  return fetch(routes.games, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ width, height }),
  })
    .then(response => response.json());
}

export function getGame(id) {
  return fetch(routes.game(id))
    .then(response => response.json());
}

function action(route, { x, y }, retries = 3) {
  return fetch(route, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ x, y }),
  })
    .then(async (response) => {
      if (response.ok === true) {
        return response.json();
      }
      if (retries > 0) {
        return action(route, { x, y }, retries - 1);
      }
      let json;
      try {
        json = response.json();
      } catch (error) {
        const text = await response.text();
        throw new Error(text);
      }
      throw new Error(json.status);
    });
}

export function flag({ id, x, y }) {
  return action(routes.flag(id), { x, y });
}

export function reveal({ id, x, y }) {
  return action(routes.reveal(id), { x, y });
}
