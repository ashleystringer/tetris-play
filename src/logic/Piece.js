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
  /*
  for (let y = 0; y < this.piece.piece.length; y++){
    for(let x = 0; x < y; x++){
      [this.piece.piece[x][y], this.piece.piece[y][x]] =
      [this.piece.piece[y][x], this.piece.piece[x][y]]; 
    }
  }

  this.piece.piece.forEach(row => row.reverse());
  */
}
