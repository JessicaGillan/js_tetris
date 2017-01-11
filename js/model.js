var TETRIS = TETRIS || {};
TETRIS.model = (function() {
  "use strict";
  var exports = {};

  var Coord = function Coord(x,y,value) {
    this.x = x;
    this.y = y;
    this.value = value || null;
  };

  var newBoard = function newBoard(size) {
    var grid = {};
    for(var r = 0; r < size; r++) {
      for(var c = 0; c < size; c++) {
        grid[r + "_" + c] = new Coord(r,c);
      }
    }
    return grid;
  };

  exports.updateCell = function updateCell(coord) {
    var cell = coord.x + "_" + coord.y;
    if (this.board[cell], coord.value) {
      this.board[cell] = coord;
      return true;
    } else {
      return false;
    }
  };

  exports.init = function init(boardSize) {
    exports.board = newBoard(boardSize);
  };

  return exports;
})();
