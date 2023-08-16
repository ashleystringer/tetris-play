/*export function createNewBoard(rows, columns, element) {
  //return Array.from({ length: rows }, () => Array(columns).fill(element));
  return Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => element)
  );
  //the same element is being referenced
}

export function transferToBoard(board, piece, { x, y }) {
  piece.forEach((row, y_) => {
    row.forEach((block, x_) => {
      board[x + x_][y + y_] = block;
    });
  });

  return board;
}*/

export default class Board {
  constructor(rows, columns, piece) {
    this.piece = piece; //add piece
    console.log(this.piece);
    this.rows = rows;
    this.columns = columns;
    this.block_size = 30;
    this.board = this.createBoard(rows, columns, 0);

    console.table(this.board);
  }

  resetBoard() {
    //this.board = this.createBoard(this.rows, this.columns, 0);
    this.piece.reset();
  }

  setBoardContext(context) {
    this.context = context;
  }

  //create board
  createBoard(rows, columns, element) {
    return Array.from({ length: rows }, () =>
      Array.from({ length: columns }, () => element)
    );
  }

  //draw board
  drawBoard() {
    console.log(`rows: ${this.rows}, columns: ${this.columns}`);
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.columns; c++) {
        if (this.board[r][c] == 0) {
          this.drawPixel(c, r, "white");
        } else {
          this.drawPixel(c, r, "blue"); //make this dynamic later
        }
      }
    }
  }

  drawPixel(x, y, color) {
    this.context.fillStyle = color;
    this.context.fillRect(
      x * this.block_size,
      y * this.block_size,
      this.block_size,
      this.block_size
    );

    this.context.strokeStyle = "black";
    this.context.strokeRect(
      x * this.block_size,
      y * this.block_size,
      this.block_size,
      this.block_size
    );
  }

  undrawPixel(x, y) {
    this.drawPixel(x, y, "white");
  }

  drawPiece() {
    const pieceGrid = this.piece.piece;
    for (let r = 0; r < pieceGrid.length; r++) {
      for (let c = 0; c < pieceGrid[0].length; c++) {
        if (pieceGrid[r][c] !== 0) {
          const x = this.piece.x + r;
          const y = this.piece.y + c;
          this.drawPixel(x, y, "blue"); //x, y
        }
      }
    }
  }

  undrawPiece() {
    const pieceGrid = this.piece.piece;
    for (let r = 0; r < pieceGrid.length; r++) {
      for (let c = 0; c < pieceGrid[0].length; c++) {
        if (pieceGrid[r][c] !== 0) {
          const x = this.piece.x + r;
          const y = this.piece.y + c;
          this.drawPixel(x, y, "white"); //x, y
        }
      }
    }
  }

  changePosition({ x, y }) {
    const newX = this.piece.x + x;
    const newY = this.piece.y + y;

    if (this.isBound(newX, newY)) {
      //newX, newY
      //undraw board
      this.undrawPiece();
      this.piece.x += x;
      this.piece.y += y;
      this.drawPiece();
    }
  }

  changeOrientation() {
    //find a way to check for collision
    if (this.isBound(this.piece.x, this.piece.y)) {
      this.undrawPiece();
      this.piece.rotate();
      this.drawPiece();
    }
  }

  //reset board

  //detect collision
  //board bounds
  isBound(x, y) {
    //x, y

    for (let r = 0; r < this.piece.piece.length; r++) {
      for (let c = 0; c < this.piece.piece.length; c++) {
        if (!this.piece.piece[r][c]) {
          continue;
        }

        const offsetX = x + r;
        const offsetY = y + c;

        if (offsetX >= this.columns || offsetX < 0) {
          return false;
        }
        if (offsetY >= this.rows || offsetY < 0) {
          //console.log("Tetronimo has reached the final row.");
          this.freeze();
          return false;
        }
        //console.log(`offsetX: ${offsetX}, offsetY: ${offsetY}`);
        //console.log(this.board[offsetX][offsetY]);
        /*if (this.board[offsetX][offsetY] == 1) {
          console.log("board[x][y] == 1");
        }*/
      }
    }
    return true;
  }

  freeze() {
    //freeze piece
    this.piece.piece.map((row, x) => {
      row.map((block, y) => {
        if (block == 1) {
          const newX = this.piece.x + x;
          const newY = this.piece.y + y;
          this.board[newY][newX] = 1; //fix the variable names
        }
      });
    });
    console.table(this.board);
    this.shift();
    this.resetBoard();
  }

  shift() {
    const isRowFilled = this.board[this.rows - 1].every(block => block === 1);
    if (isRowFilled) {
      console.log("isRowFilled");
      //Score
      this.board.splice(this.rows - 1, 1);
      const newRow = Array.from({ length: this.columns }, () => 0);
      console.log(newRow);
      this.board.unshift(newRow);

      this.drawBoard();
    }
  }
}
