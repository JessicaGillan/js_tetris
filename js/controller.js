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
      console.log("moving down");
      view.movePieceDown();
    } else {
      console.log("hit Bottom!");
      var newPiece = data.hitBottom();
      view.addPiece(data.piece);
    }
  };

  setInterval( movePieceDown, 250);




})(TETRIS.data, TETRIS.view);
