const piece_i = [
  [0, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 0, 0]
];
const piece_o = [
  [0, 0, 0],
  [1, 1, 0],
  [1, 1, 0]
];

const piece_t = [
  [1, 1, 1],
  [0, 1, 0],
  [0, 0, 0]
];

const piece_s = [
  [0, 0, 0],
  [0, 1, 1],
  [1, 1, 0]
];

const piece_z = [
  [0, 0, 0],
  [1, 1, 0],
  [0, 1, 1]
];

const piece_j = [
  [0, 0, 1],
  [0, 0, 1],
  [0, 1, 1]
];

const piece_l = [
  [1, 0, 0],
  [1, 0, 0],
  [1, 1, 0]
];

export const tetronimoes = [
  piece_i,
  piece_o,
  piece_t,
  piece_s,
  piece_z,
  piece_j,
  piece_l
];

export function randomizePiece() {
  return tetronimoes[Math.floor(Math.random() * tetronimoes.length)];
}
