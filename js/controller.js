var TETRIS = TETRIS || {};
TETRIS.Controller = (function(Data,View) {
  'use strict';

  var SPEED = 300;

  var _gameLoop = function() {

    // if (direction === "right") {
    //   View.movePieceRight();
    // } else if (direction === "left") {
    //   View.movePieceLeft();
    // } else if (direction === "down") {
    //   View.movePieceDown();
    // } else if (direction === "rotateR") {
    //   View.rotatePieceR();
    // }

    if (Data.movePieceDown() || Data.keyPressMovePiece()) {
      // View.movePieceDown();
    } else {
      // if we have full Rows
      if (Data.hitBottom()){
        View.updateScore(Data.getScore());
      }
      // View.addPiece(Data.getActivePiece());
    }
    View.renderBoard(Data.getBoard());
  };


  var init = function init() {
    // Run Initialization
    Data.init(20, 15);
    View.init({
      keydown: Data.startKey,
      keyup: Data.stopKey,
    });
    View.renderBoard(Data.getBoard(), 20, 15);

    Data.addPiece();

    setInterval( _gameLoop, SPEED);
  }

  return {
          init: init
         }

})(TETRIS.Data, TETRIS.View);

TETRIS.Controller.init();
