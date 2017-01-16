var TETRIS = TETRIS || {};
TETRIS.Data = (function() {
  "use strict";

  var keys = {},
      piece,
      board,
      boardEdges,
      score = 0,
      gameOver = false;

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
    i: new Shape([[0,0],[0, 1],[0, -1], [0,-2]], "cyan"),
    s: new Shape([[0,0],[-1, 0],[0, -1], [1,-1]], "red"),
    z: new Shape([[0,0],[1, 0],[-1,-1],[0,-1]], "green"),
    l: new Shape([[0,0],[1, 0],[0, -1],[0,-2]], "orange"),
    j: new Shape([[0,0],[-1, 0],[0, -1],[0,-2]], "pink"),
    t: new Shape([[0,0],[-1,-1],[0,-1],[1,-1]], "purple")
  };

  var ROTATE_R = { up: 'right', right: 'down', down: 'left', left: 'up'};
  var ROTATE_L = { up: 'left', left: 'down', down: 'right', right: 'up'};

  var Piece = function Piece(startingCoord, shape, color) {
    this.coreCoord = startingCoord;
    this.orientation = "up";
    this.transformation = shape.cells;
    this.leftMost = startingCoord;
    this.rightMost = startingCoord;
    this.topMost = startingCoord;
    this.bottomMost = startingCoord;
    this.color = color;

    this.updateCells(); // Update the cells on creation
  };

  Piece.prototype.updateCells = function updateCells() {
    var transform = (this.transformation !== SHAPES.o.cells), // Don't rotate 'o'
        array = [],
        i = 0,
        coords,
        newCoord;

    for ( ; i < this.transformation.length; i++) {
      if (transform) {
        coords = this.transform(this.transformation[i]);
      } else {
        coords = [this.coreCoord.x + this.transformation[i][0], this.coreCoord.y + this.transformation[i][1]];
      }

      newCoord = new Coord(coords[0], coords[1], this.color);

      this.updateEdges(newCoord);

      array.push(newCoord);
    }
    this.cells = array;
  };

  Piece.prototype.transform = function transform(offsets){
    switch (this.orientation) {
      case "up":
        return [this.coreCoord.x + offsets[0], this.coreCoord.y + offsets[1]]
        break;
      case "down":
      return [this.coreCoord.x + offsets[0], this.coreCoord.y - offsets[1]]
        break;
      case "right":
        return [this.coreCoord.x + offsets[1], this.coreCoord.y + offsets[0]]
        break;
      case "left":
        return [this.coreCoord.x - offsets[1], this.coreCoord.y + offsets[0]]
        break;
      default:
        return [this.coreCoord.x + offsets[0], this.coreCoord.y + offsets[1]]
    }
  }

  Piece.prototype.updateEdges = function updateEdges(coord) {
    if (coord.x < this.leftMost.x) {
      this.leftMost = coord;
    } else if (coord.x > this.rightMost.x) {
      this.rightMost = coord;
    }
    if (coord.y < this.topMost.y) {
      this.topMost = coord;
    } else if (coord.y > this.bottomMost.y) {
      this.bottomMost = coord;
    }
  }

  Piece.prototype.rotateR = function rotateR() {
    this.orientation = ROTATE_R[this.orientation];

    this.updateCells();
  }

  Piece.prototype.rotateL = function rotateL() {
    this.orientation = ROTATE_L[this.orientation];

    this.updateCells();
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
    var cell = TETRIS.getKey(coord.x,coord.y);

    if (board[cell]) { // if cell is on board
      board[cell] = coord;
      return true;
    } else {
      gameOver = true;
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
    var cellKey;

    for (var i = 0; i < cells.length; i++) {
      cellKey = TETRIS.getKey(cells[i].x,cells[i].y);

      if (board[cellKey]) {
        if (board[cellKey].value) return true;
      } else {
        return false;
      }
    }

    return false;
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

  var _rotatePieceLeft = function _rotatePieceLeft() {
    piece.rotateL();

    if (_collision(piece.cells)) {
      piece.rotateR();
      return false;
    }
    return true;
  };

  var _rotatePieceRight = function _rotatePieceRight() {
    piece.rotateR();
    console.log("rotated r", piece.cells);
    if (_collision(piece.cells)) {
      console.log("rotated back l", piece.cells);
      piece.rotateL();
      return false;
    }

    return true;
  };

  // Public Methods

  var movePieceDown = function movePieceDown(by) {
    by = by || 1;
    if (piece.bottomMost.y < (boardEdges.bottom - by)) {
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
      movePieceDown(2);

    } else if (keys[39]) { // right arrow
      _movePieceRight();

    } else if (keys[37]) { // left arrow
      _movePieceLeft();

    } else if (keys[38]) { // up arrow = rotate right
      _rotatePieceRight();

    } else if(keys[32]) { // spacebar = hard drop
      var inc = 3;
      while(movePieceDown(inc)){}
      while(movePieceDown(inc-1)){}
      keys[32] = false;
    }
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

  var getGameOver = function getGameOver() {
    return gameOver;
  }

  var init = function init(height, width) {
    board = _newBoard(height, width);
    TETRIS.getKey(1,2);
    addPiece();
  };

  return {
           init: init,
           getGameOver: getGameOver,
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
