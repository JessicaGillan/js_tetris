var TETRIS = TETRIS || {};
TETRIS.Controller = (function(Data,View) {
  'use strict';

  var SPEED = 300;

  var _gameLoop = function() {

    // TODO: second part of or is no getting executed, FIX!
    if (Data.movePieceDown() || Data.keyPressMovePiece()) {
      // View.movePieceDown();
    } else {
      // if we have full Rows
      if (Data.hitBottom()){
        View.updateScore(Data.getScore());
      }
    }

    // TODO: Optimize to just clear last piece position and add new
    // piece posisition unless hit bottom, then re-render board
    View.renderBoard(Data.getBoard());
    View.renderPiece(Data.getActivePiece());
  };


  var init = function init(h,w) {
    h = h || 20;
    w = w || 10;

    // Run Initialization
    Data.init(h, w);
    View.init(h, w, {
      keydown: Data.startKey,
      keyup: Data.stopKey,
    });

    View.renderBoard(Data.getBoard());
    View.renderPiece(Data.getActivePiece());

    setInterval( _gameLoop, SPEED);
  }

  return {
          init: init
         }

})(TETRIS.Data, TETRIS.View);

TETRIS.Controller.init();
