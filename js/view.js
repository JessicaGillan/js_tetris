var TETRIS = TETRIS || {};
TETRIS.View = (function() {
  "use strict";
  var CELL_SIDE = 30;

  var group, two, canvas;


  var _initTwo = function _initTwo() {
    two = new Two({ fullscreen: true });
    canvas = document.getElementById('canvas');
    two.appendTo(canvas);
    two.update();
  }

  var _addListeners = function _addListeners(listeners) {
    listeners = listeners || {};
    var _this = this;

    if (listeners.keydown) {
      document.body.addEventListener('keydown', function(e) {
        listeners.keydown(e.which || e.keycode);
      });
      document.body.addEventListener('keyup', function(e) {
        listeners.keyup(e.which || e.keycode);
      });
    }
  };

  var _drawSquare = function(coord) {
    var center = _getCenter(coord);
    var rect = two.makeRectangle(center[0], center[1], CELL_SIDE, CELL_SIDE); // center x, center y, width, height
    rect.fill = coord.value;
    rect.stroke = "silver";

    return rect;
  };

  var _getCenter = function(coord) {
    var x = (coord.x * CELL_SIDE) + CELL_SIDE/2;
    var y = (coord.y * CELL_SIDE) + CELL_SIDE/2;

    return [x,y];
  };

  var init = function init(listeners) {
    _initTwo();
    _addListeners(listeners);
  };

  var renderBoard = function renderBoard(board) {
    for (var coord in board) {
      _drawSquare(board[coord]);
    }

    two.update();
  };

  var addPiece = function addPiece(piece) {
    group = two.makeGroup();

    for(var i = 0; i < piece.cells.length; i++) {
      group.add(_drawSquare(piece.cells[i]));
    }

    two.update();
  };

  var movePieceDown = function() {
    group.translation.y += CELL_SIDE;
    two.update();
  };

  var movePieceLeft = function() {
    group.translation.x -= CELL_SIDE;
    two.update();
  };

  var movePieceRight = function() {
    group.translation.x += CELL_SIDE;
    two.update();
  };

  return {
            init: init,
            renderBoard: renderBoard,
            addPiece: addPiece,
            movePieceRight: movePieceRight,
            movePieceLeft: movePieceLeft,
            movePieceDown: movePieceDown
         };
})();
