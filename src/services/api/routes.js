const API_ROOT = 'http://localhost:8000/api/';

const games = `${API_ROOT}games/`;
const game = id => `${API_ROOT}games/${id}/`;
const flag = id => `${game(id)}flag/`;
const reveal = id => `${game(id)}reveal/`;

export default {
  games,
  game,
  flag,
  reveal,
};
