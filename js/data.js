var TETRIS = TETRIS || {};
TETRIS.data = (function() {
  "use strict";
  var exports = {};

  var Coord = function Coord(x,y,value) {
    this.x = x;
    this.y = y;
    this.value = value || null;
  };

  var Shape = function Shape(array, color) {
    color = color || "grey";

    this.color = color;
    this.core = new Coord(0,0,this.color);
    this.cells = array;
  }

  var shapes = {
    o: new Shape([[1,0],[0,-1],[1,-1]], "yellow"), //[0,0],
    i:"",
    s:"",
    z:"",
    l:"",
    j:"",
    t:""
  }

  var Piece = function Piece(startingCoord, shape, color) {
    var piece = [];
    color = color || "grey";
    startingCoord.value = color;

    piece.push(startingCoord)

    var i = shape.cells.length;
    while (i) {
      piece.push( new Coord(startingCoord.x + shape.cells[i-1][0], startingCoord.y + shape.cells[i-1][1], color) );
      i--;
    }

    return piece;
  }

  var newBoard = function newBoard(size) {
    var grid = {};
    for(var r = 0; r < size; r++) {
      for(var c = 0; c < size; c++) {
        grid[r + "_" + c] = new Coord(r,c);
      }
    }
    return grid;
  };

 // TODO Change this back to Coord parameter, delete line 24, remove from exports
  exports.updateCell = function updateCell(x,y,v) {
    var coord = new Coord(x,y,v);
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
    exports.piece = new Piece((new Coord(10,0)), shapes.o, "purple");
  };

  return exports;
})();


// Piece = array of Coords, values set to color

// Shapes - game constant stored w/ core x, y
// and array of offsets for each other cell
// Can create a piece off core xy and shape offsets
// core xy will change to move piece
