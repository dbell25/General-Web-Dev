// board.js
// author: Daniel Bell
export class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfRows = numberOfRows;
    this._numberOfColumns = numberOfColumns;
    this._numberOfTiles = numberOfRows * numberOfBombs;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  // retrieves the player board.
  get playerBoard() {
    return this._playerBoard;
  }

  // flips a tile to reveal a bomb, or a numbered space.
  flipTile(rowIndex, columnIndex) {
    if (this._playerBoard[rowIndex][columnIndex] !== ' ') return;
    else if (this._bombBoard[rowIndex][columnIndex] === 'B') this._playerBoard[rowIndex][columnIndex] = 'B';
    else this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
    this._numberOfEmptySpaces--;
  }

  // returns the number of bombs in the vincinity.
  getNumberOfNeighborBombs(rowIndex, columnIndex) {
    const neighborOffsets = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1]
    ];
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;
    let numberOfBombs = 0;
    neighborOffsets.forEach(offset => {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];
      if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows &&
        neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
          numberOfBombs++;
        }
      }
    });
    return numberOfBombs;
  }

  // returns whether or not there are any safe tiles left.
  hasSafeTiles() {
    return (this._numberOfTiles !== this._numberOfBombs);
  }

  // prints the board to the console
  print() {
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
  }

  // generates the beginning play field.
  static generatePlayerBoard(numberOfRows, numberOfColumns) {
    var board = [];
    for (let i = 0; i < numberOfRows; i++) {
      let temp = [];
      for (let j = 0; j < numberOfColumns; j++) {
        temp.push(' ');
      }
      board.push(temp);
    }
    return board;
  }

  // generates the beginning bomb positions.
  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    const board = [];
    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
      const row = [];
      for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
        row.push(null);
      }
      board.push(row);
    }
    let numberOfBombsPlaced = 0;
    while (numberOfBombsPlaced < numberOfBombs) {
      const randomRowIndex = Math.floor(Math.random() * numberOfRows);
      const randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
      if (board[randomRowIndex][randomColumnIndex] !== 'B') {
        board[randomRowIndex][randomColumnIndex] = 'B';
        numberOfBombsPlaced++;
      }
    }
    return board;
  }
}
