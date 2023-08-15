import { tetronimoes } from "./Tetronimoes";

export default class Piece {
  constructor() {
    this.piece = this.randomizePiece();
    this.x = 0;
    this.y = 0;
  }
  randomizePiece() {
    return tetronimoes[Math.floor(Math.random() * tetronimoes.length)];
  }

  reset() {
    this.piece = this.randomizePiece();
    this.x = 0;
    this.y = 0;
  }

  rotate() {
    for (let y = 0; y < this.piece.length; y++) {
      for (let x = 0; x < y; x++) {
        [this.piece[x][y], this.piece[y][x]] = [
          this.piece[y][x],
          this.piece[x][y]
        ];
      }
    }

    this.piece.forEach(row => row.reverse());
  }
}
