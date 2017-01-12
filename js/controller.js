var TETRIS = TETRIS || {};
TETRIS.Controller = (function(Data,View) {
  'use strict';

  var SPEED = 300;

  var _gameLoop = function() {
    var direction = Data.keyPressMovePiece();

    if (direction === "right") {
      View.movePieceRight();
    } else if (direction === "left") {
      View.movePieceLeft();
    } else if (direction === "down") {
      View.movePieceDown();
    }

    if (Data.movePieceDown()) {
      View.movePieceDown();
    } else {
      // if we have full Rows
      if (Data.hitBottom()){
        View.renderBoard(Data.getBoard());
        View.updateScore(Data.getScore());
      }
      View.addPiece(Data.getActivePiece());
    }
  };


  var init = function init() {
    // Run Initialization
    Data.init(20, 15);
    View.init({
      keydown: Data.startKey,
      keyup: Data.stopKey,
    });
    View.renderBoard(Data.getBoard());

    Data.addPiece();
    View.addPiece(Data.getActivePiece());

    setInterval( _gameLoop, SPEED);
  }

  return {
          init: init
         }

})(TETRIS.Data, TETRIS.View);

TETRIS.Controller.init();
