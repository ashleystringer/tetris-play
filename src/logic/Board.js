import { POINTS_ACTIONS } from "../logic/Score";

export default class Board {
  constructor(rows, columns, piece, scoreDispatch) {
    this.piece = piece; //add piece
    //console.log(this.piece);
    this.rows = rows;
    this.columns = columns;
    this.block_size = 30;
    this.board = this.createBoard(rows, columns, 0);
    this.scoreDispatch = scoreDispatch;
    this.numOfLines = 0;
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
          this.drawPixel(x, y, "blue");
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
          this.drawPixel(x, y, "white");
        }
      }
    }
  }

  changePosition({ x, y }) {
    const newX = this.piece.x + x;
    const newY = this.piece.y + y;

    if (!this.isCollision(newX, newY)) {
      this.placeGhost(newX, newY);
      this.undrawPiece();
      this.piece.x += x;
      this.piece.y += y;
      this.drawPiece();
    }
  }

  changeOrientation() {
    //find a way to check for collision
    if (!this.isCollision(this.piece.x, this.piece.y)) {
      //this.placeGhost(this.piece.x, this.piece.y);
      this.undrawPiece();
      this.piece.rotate();
      this.drawPiece();
    }
  }

  //detect collision
  //board bounds
  isCollision(x, y) {
    //x, y

    for (let r = 0; r < this.piece.piece.length; r++) {
      for (let c = 0; c < this.piece.piece.length; c++) {
        if (!this.piece.piece[r][c]) {
          continue;
        }

        const offsetX = x + r;
        const offsetY = y + c;

        if (offsetX >= this.columns || offsetX < 0) {
          return true;
        }
        if (offsetY >= this.rows || offsetY < 0) {
          this.freeze();
          return true;
        }
        if (offsetY == 1 && this.board[offsetY][offsetX] == 1) {
          console.log("Game Over");
        }
        if (this.board[offsetY][offsetX] == 1) {
          this.freeze();
          return true;
        }
      }
    }
    return false;
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
    this.shift();
    this.piece.reset();
  }

  shift() {
    this.board.forEach((row, index) => {
      const isRowFilled = this.board[index].every(block => block === 1);
      if (isRowFilled) {
        this.numOfLines++;

        console.log(this.numOfLines);
        if (this.numOfLines > 2) {
          this.numOfLines = 0;
          this.scoreDispatch({ type: POINTS_ACTIONS.INCR_LEVEL });
        }

        this.board.splice(this.rows - 1, 1);
        const newRow = Array.from({ length: this.columns }, () => 0);
        this.board.unshift(newRow);
      }
    });
    this.updateLines(this.numOfLines);

    this.drawBoard();
  }

  placeGhost(x, y) {
    //undraw any ghost pieces

    //place ghost of a tetronimo
    //iterate through each block
    //"telegraph" the block to some location
    //find out where the tetronimo is on course to hit a collision
    //display a transparent version of that piece in that location
    const ghostRow = this.findGhostRow(x, y);

    //draw the ghost piece
    //but only if it's soft dropping
    //console.log(ghostRow);
  }

  findGhostRow(x, y) {
    for (let r = y; r < this.board.length; r++) {
      if (this.board[r][x] === 1) {
        return r;
      }
    }
    return this.rows;
  }

  updateLines(lineNum) {
    const linePoints =
      lineNum === 1
        ? POINTS_ACTIONS.SINGLE
        : lineNum === 2
        ? POINTS_ACTIONS.DOUBLE
        : lineNum === 3
        ? POINTS_ACTIONS.TRIPLE
        : lineNum === 4
        ? POINTS_ACTIONS.TETRIS
        : 0;

    if (lineNum > 0) this.scoreDispatch({ type: linePoints });
  }
}
