// game.js
// author: Daniel Bell
import {
  board
} from './board';

class Game {
  // Creates a new game object.
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  // handles an individual player move.
  playMove(rowIndex, columnIndex) {
    this._board.flipTile(rowIndex, columnIndex);
    if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
      console.log('\nGAME OVER! Final Board:');
      this._board.print();
    }
    if (!this._board.hasSafeTiles()) {
      console.log('\nYOU WIN!');
    } else {
      console.log('\nCurrent board:');
      this._board.print();
    }
  }
}
