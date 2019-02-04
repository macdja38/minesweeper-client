/* eslint-disable no-bitwise */
/**
 * Checks if a specific bit is set
 * @param {number} bit
 * @param {number} [possibleNumber]
 * @returns {function || boolean}
 */
export function isSet(bit, possibleNumber) {
  const execute = (number) => {
    const mask = 1 << bit;
    return (number & mask) === mask;
  };

  if (typeof possibleNumber === 'number') {
    return execute(possibleNumber);
  }

  return execute;
}

export const isHidden = isSet(7);
export const isBomb = isSet(5);

export function isFlagged(tile) {
  return isHidden(tile) && isSet(6, tile);
}


export function extractAdjacent(tile) {
  return tile & 0b1111;
}

function setBit(bit, possibleBoolean, tile = 0) {
  const execute = (boolean) => {
    const mask = 1 << bit;
    if (boolean) {
      return mask | tile;
    }
    return (~mask) & tile;
  };

  if (typeof possibleBoolean === 'boolean') {
    return execute(possibleBoolean);
  }

  return execute;
}

export const setHidden = setBit(7);
export const setFlagged = setBit(6);
export const setBomb = setBit(5);


export function setAdjacent(value, tile = 0) {
  if (value > 0b1111) {
    throw new RangeError('tile being set must be a maximum of 4 bits');
  }
  return (value & 0b1111) + (tile & (~0b1111));
}


export function createTile(hidden, flagged, bomb, number = 0) {
  return setHidden(hidden) + setFlagged(flagged) + setBit(bomb) + number;
}
