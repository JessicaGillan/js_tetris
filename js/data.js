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
  };

  var SHAPES = {
    o: new Shape([[0,0],[1, 0],[0, -1], [1,-1]], "yellow"),
    i: new Shape([[0,0],[0,-1],[0, -2], [0,-3]], "cyan"),
    s: new Shape([[0,0],[1, 0],[1, -1], [2,-1]], "red"),
    z: new Shape([[0,0],[1, 0],[-1,-1],[0,-1]], "green"),
    l: new Shape([[0,0],[1, 0],[0, -1],[0,-2]], "orange"),
    j: new Shape([[0,0],[1, 0],[1, -1],[1,-2]], "pink"),
    t: new Shape([[0,0],[-1,-1],[0,-1],[1,-1]], "purple")
  };

  var Piece = function Piece(startingCoord, shape, color) {
    this.coreCoord = startingCoord;
    this.updateCells = function updateCells() {
      var array = [];
      for (var i = 0; i < shape.cells.length; i++) {
        array.push(new Coord(
          this.coreCoord.x + shape.cells[i][0],
          this.coreCoord.y + shape.cells[i][1],
          color
        ));
      }
      this.cells = array;
    };
    this.updateCells();
    this.transformation = shape.cells;
    this.color = color;
  };

  exports.movePieceDown = function movePieces() {
    if (exports.piece.coreCoord.y < exports.boardEdges.bottom) {
      exports.piece.coreCoord.y += 1;
      exports.piece.updateCells();
      return true;
    } else {
      return false;
    }
  };

  var newBoard = function newBoard(size) {
    var grid = {};
    for(var r = 0; r < size; r++) {
      for(var c = 0; c < size; c++) {
        grid[r + "_" + c] = new Coord(r,c);
      }
    }

    TETRIS.data.boardEdges = { left: 0, right: size - 1, top: 0, bottom: size - 1 };

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

  exports.piece = null;

  exports.addPiece = function addPiece() {
    var keys = Object.keys(SHAPES);
    var key = keys[Math.floor(Math.random() * keys.length)];

    this.piece = new Piece((new Coord(9,0)), SHAPES[key], SHAPES[key].color);

    return this.piece;
  };

  exports.hitBottom = function hitBottom() {
    
  };

  exports.init = function init(boardSize) {
    exports.board = newBoard(boardSize);
  };

  return exports;
})();


// Piece = array of Coords, values set to color

// Shapes - game constant stored w/ core x, y
// and array of offsets for each other cell
// Can create a piece off core xy and shape offsets
// core xy will change to move piece
