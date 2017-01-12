var TETRIS = TETRIS || {};
TETRIS.Controller = (function(Data,View) {
  'use strict';

  var SPEED = 150;

  var gameLoop = function() {
    var direction = Data.keyPressMovePiece();
    if (direction === "right")
      View.movePieceRight();
    if (direction === "left")
      View.movePieceLeft();
    if (Data.movePieceDown()) {
      console.log("moving down");
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

    setInterval( gameLoop, SPEED);
  }

  return {
          init: init
         }

})(TETRIS.Data, TETRIS.View);

TETRIS.Controller.init();
