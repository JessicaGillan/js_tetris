var TETRIS = TETRIS || {};
TETRIS.Controller = (function(Data,View) {
  'use strict';

  var SPEED = 150;

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
      console.log("hit Bottom!");
      var newPiece = Data.hitBottom();
      View.addPiece(Data.getActivePiece());
    }
  };


  var init = function init() {
    // Run Initialization
    Data.init(20);
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
