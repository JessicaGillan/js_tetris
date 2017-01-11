var TETRIS = TETRIS || {};
TETRIS.controller = (function(data,view) {
  'use strict';

  // Run Initialization
  data.init(20);
  view.renderBoard(data.board);

  data.addPiece();
  view.addPiece(data.piece);

  var movePieceDown = function() {
    if (data.movePieceDown()) {
      view.movePieceDown();
    } else {
      data.hitBottom();
    }
  };

  setInterval( movePieceDown, 500);




})(TETRIS.data, TETRIS.view);
