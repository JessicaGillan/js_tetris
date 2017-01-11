var TETRIS = TETRIS || {};
TETRIS.controller = (function(data,view) {
  'use strict';

  // Run Initialization
  data.init(20);
  view.renderBoard(data.board);

  data.addPiece();
  view.addPiece(data.pieces[0]);

  var movePieces = function() {
    data.movePieces();
    view.movePieces();
  }

  setInterval( movePieces, 500);




})(TETRIS.data, TETRIS.view);
