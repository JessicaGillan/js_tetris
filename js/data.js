var TETRIS = TETRIS || {};
TETRIS.Data = (function() {
  "use strict";

  var keys = {},
      piece,
      board,
      boardEdges;

  // Constructors

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

  // Private Methods

  var _setBoardEdges = function _setBoardEdges(size){
    boardEdges = { left: 0, right: size, top: 0, bottom: size };
  }

  var _updateBoard = function _updateBoard() {
    for (var i = 0; i < piece.cells.length; i++) {
      _updateCell(piece.cells[i]);
    }
  };

  var _updateCell = function _updateCell(coord) {
    var cell = coord.x + "_" + coord.y;

    if (board[cell]) { // if cell is on board
      board[cell] = coord;
      return true;
    } else {
      return false;
    }
  };

  var _checkForCompletedRows = function _checkForCompletedRows() {
    var fullRow, fullRows = [];

    for (var r = 0; r < boardEdges.bottom; r++) {
      fullRow = true;
      for (var c = 0; c < boardEdges.right; c++) {
        // fullRow is false if there is an empty cell
        if (!board[r + "_" + c]) fullRow = false;
      }
      if (fullRow) {
        console.log("full row!!!");
        fullRows.push(r);
      }
    }

    return fullRows;
  };

  var _collision = function _collision(cells) {
    var collide = false;
    for (var i = 0; i < cells.length; i++) {
      var cellKey = cells[i].x + "_" + cells[i].y;

      if (board[cellKey]) {
        if (board[cellKey].value) collide = true;
      }
    }

    return collide;
  };

  var _newBoard = function _newBoard(size) {
    var grid = {};

    for(var r = 0; r < size; r++) {
      for(var c = 0; c < size; c++) {
        grid[r + "_" + c] = new Coord(r,c);
      }
    }

    _setBoardEdges(size);

    return grid;
  };

  // Public Methods

  var movePieceDown = function movePieceDown() {
    if (piece.coreCoord.y < (boardEdges.bottom - 1)) {
      piece.coreCoord.y += 1;
      piece.updateCells();

      if (_collision(piece.cells)) {
        piece.coreCoord.y -= 1;
        piece.updateCells();

        return false;
      }

      return true;
    } else {
      return false;
    }
  };

  var movePieceLeft = function movePieceLeft() {
    console.log("moving left");
    if (piece.coreCoord.x > boardEdges.left) {
      piece.coreCoord.x -= 1;
      piece.updateCells();

      if (_collision(piece.cells)) {
        piece.coreCoord.x += 1;
        piece.updateCells();

        return false;
      }

      return true;
    } else {
      return false;
    }
  };

  var movePieceRight = function movePieceRight() {
    console.log("moving right");
    if (piece.coreCoord.x < (boardEdges.right - 1)) {
      piece.coreCoord.x += 1;
      piece.updateCells();

      if (_collision(piece.cells)) {
        piece.coreCoord.x -= 1;
        piece.updateCells();

        return false;
      }

      return true;
    } else {
      return false;
    }
  };

  var startKey = function startKey(key){
    keys[key] = true;
  };

  var stopKey = function stopKey(key){
    keys[key] = false;
  };

  var keyPressMovePiece = function keyPressMovePiece(){
    if (keys[40]) { // down arrow
      // exports.movePieceDown();
    }
    if (keys[39]) { // right arrow
      if (movePieceRight())
        return "right";
    }
    if (keys[37]) { // left arrow
      if (movePieceLeft())
        return "left";
    }
    return false;
    //  if(this.keys[32]){ // spacebar
    //  }

  };

  var addPiece = function addPiece() {
    var keys = Object.keys(SHAPES);
    var key = keys[Math.floor(Math.random() * keys.length)];

    piece = new Piece((new Coord(9,0)), SHAPES[key], SHAPES[key].color);

    return piece;
  };

  var hitBottom = function hitBottom() {
    // move current into board
    _updateBoard();

    // TODO: check for row complete
    var fullRows = _checkForCompletedRows();
    // shiftBoard(fullRows);

    // add new piece
    addPiece();
  };

  var getActivePiece = function getActivePiece() {
    console.log(piece);
    return piece;
  }

  var getBoard = function getBoard() {
    return board;
  }

  var init = function init(boardSize) {
    board = _newBoard(boardSize);
  };

  return {
           init: init,
           getActivePiece: getActivePiece,
           getBoard: getBoard,
           addPiece: addPiece,
           keyPressMovePiece: keyPressMovePiece,
           movePieceDown: movePieceDown,
           hitBottom: hitBottom,
           startKey: startKey,
           stopKey: stopKey
         };
})();
