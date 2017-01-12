var TETRIS = TETRIS || {};
TETRIS.Data = (function() {
  "use strict";

  var keys = {},
      piece,
      board,
      boardEdges,
      score = 0;

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
    // win: new Shape([[0,0],[1,0],[2,0], [3,0], [4,0], [5,0], [-1,0], [-2,0],[-3,0], [-4,0]], "yellow")
    o: new Shape([[0,0],[1, 0],[0, -1], [1,-1]], "yellow"),
    i: new Shape([[0,0],[0,-1],[0, -2], [0,-3]], "cyan"),
    s: new Shape([[0,0],[1, 0],[1, -1], [2,-1]], "red"),
    z: new Shape([[0,0],[1, 0],[-1,-1],[0,-1]], "green"),
    l: new Shape([[0,0],[1, 0],[0, -1],[0,-2]], "orange"),
    j: new Shape([[0,0],[1, 0],[1, -1],[1,-2]], "pink"),
    t: new Shape([[0,0],[-1,-1],[0,-1],[1,-1]], "purple")
  };

  var Piece = function Piece(startingCoord, shape, color) {
    this.coreCoord = startingCoord; // Starting coord is the bottom most cell
    this.leftMost = startingCoord;
    this.rightMost = startingCoord;
    this.topMost = startingCoord;
    this.updateCells = function updateCells() {
      var array = [];
      for (var i = 0; i < shape.cells.length; i++) {
        var newCoord = new Coord(
                                  this.coreCoord.x + shape.cells[i][0],
                                  this.coreCoord.y + shape.cells[i][1],
                                  color
                                );

        this.updateEdges(newCoord);

        array.push(newCoord);
      }
      this.cells = array;
    };


    this.updateCells(); // Update the cells on creation
    this.transformation = shape.cells;
    this.color = color;
  };

  Piece.prototype.updateEdges = function updateEdges(coord) {
    if (coord.x < this.leftMost.x) {
      this.leftMost = coord;
    } else if (coord.x > this.rightMost.x) {
      this.rightMost = coord;
    }
    if (coord.x > this.topMost.y) this.leftMost = coord;
  }

  // Private Methods

  var _setBoardEdges = function _setBoardEdges(h,w){
    boardEdges = { left: 0, right: w, top: 0, bottom: h };
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
    var fullRow, fullRows = [],
        hitEmpty = false,
        y = boardEdges.bottom - 1;

    while (!hitEmpty && y >= 0) {
      hitEmpty = true;
      fullRow = true;
      for (var x = 0; x < boardEdges.right; x++) {
        // fullRow is false if there is an empty cell
        if (!board[x + "_" + y].value) {
          fullRow = false;
        } else {
          hitEmpty = false;
        }
      }
      if (fullRow) {
        console.log("full row!!!");
        fullRows.push(y);
      }
      y--;
    }

    return fullRows;
  };

  var _shiftBoard = function _shiftBoard(fullRows) {

    var hitEmpty = false;
    var currentY, nextY;

    for (var fullI = 0; fullI < fullRows.length; fullI++) {
      hitEmpty = false;

      currentY = fullRows[fullI] + fullI;
      nextY = currentY - 1;

      while (!hitEmpty && (currentY >= 0)) {
        hitEmpty = true
        for (var x = 0; x < boardEdges.right; x++) {

          if (board[x + "_" + nextY]) {
            if (board[x + "_" + nextY].value) hitEmpty = false;

            board[x + "_" + currentY].value = board[x + "_" + nextY].value;
          } else {
            board[x + "_" + currentY].value = null;
          }
        }
        currentY = nextY;
        nextY -= 1;
      }
    }
  }

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

  var _newBoard = function _newBoard(h,w) {
    var grid = {};

    for(var y = 0; y < h; y++) {
      for(var x = 0; x < w; x++) {
        grid[x + "_" + y] = new Coord(x,y);
      }
    }

    _setBoardEdges(h,w);

    return grid;
  };

  var _movePieceLeft = function _movePieceLeft() {

    if (piece.leftMost.x > boardEdges.left) {
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

  var _movePieceRight = function _movePieceRight() {

    if (piece.rightMost.x < (boardEdges.right - 1)) {
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

  var _increaseScore = function _increaseScore(amount) {
    amount = amount || 1;
    score += amount;
    console.log(score);
  }

  // Public Methods

  var movePieceDown = function movePieceDown(by) {
    by = by || 1;
    if (piece.coreCoord.y < (boardEdges.bottom - 1)) {
      piece.coreCoord.y += by;
      piece.updateCells();

      if (_collision(piece.cells)) {
        piece.coreCoord.y -= by;
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
      if (movePieceDown(3))
        return "down";
    }
    if (keys[39]) { // right arrow
      if (_movePieceRight())
        return "right";
    }
    if (keys[37]) { // left arrow
      if (_movePieceLeft())
        return "left";
    }
    return false;
    //  if(this.keys[32]){ // spacebar
    //  }

  };

  var addPiece = function addPiece() {
    var keys = Object.keys(SHAPES);
    var key = keys[Math.floor(Math.random() * keys.length)];
    var middle = Math.floor(boardEdges.right/2) - 1;
    piece = new Piece((new Coord(middle,0)), SHAPES[key], SHAPES[key].color);

    return piece;
  };

  var hitBottom = function hitBottom() {
    // move current into board
    _updateBoard();

    // Track and clear completed rows
    var fullRows = _checkForCompletedRows();
    var num = fullRows.length;
    if (num) {
      _increaseScore(num);
      _shiftBoard(fullRows);
    }

    // add new piece
    addPiece();

    return !!num; // Indicate increased score
  };

  var getActivePiece = function getActivePiece() {
    return piece;
  }

  var getBoard = function getBoard() {
    return board;
  }

  var getScore = function getScore(){
    return score;
  }

  var init = function init(height, width) {
    board = _newBoard(height, width);
  };

  return {
           init: init,
           getActivePiece: getActivePiece,
           getBoard: getBoard,
           getScore: getScore,
           addPiece: addPiece,
           keyPressMovePiece: keyPressMovePiece,
           movePieceDown: movePieceDown,
           hitBottom: hitBottom,
           startKey: startKey,
           stopKey: stopKey
         };
})();
