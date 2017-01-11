var TETRIS = TETRIS || {};
TETRIS.view = (function() {
  "use strict";
  var exports = {};
  var two = new Two({
      width: 50,
      height: 50
    });
  var canvas = document.getElementById('canvas');
  two.appendTo(canvas);

  // two.makeCircle(10,10,10);
  exports.renderBoard = function renderBoard(board) {
    var CELL_SIDE = 20;
    for (var coord in board) {
      two.makeRectangle()
    }
  };

  two.update();

  return exports;
})();
