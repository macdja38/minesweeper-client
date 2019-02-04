const API_ROOT = 'http://localhost:8000/api/';

export const games = `${API_ROOT}games/`;
export const game = id => `${API_ROOT}games/${id}/`;
export const flag = id => `${game(id)}flag/`;
export const reveal = id => `${game(id)}reveal/`;

export default {
  games,
  game,
  flag,
  reveal,
};
