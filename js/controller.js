var TETRIS = TETRIS || {};
TETRIS.Controller = (function(Data,View) {
  'use strict';

  var SPEED = 300,
      gameLoop;

  var _gameLoop = function() {
    Data.keyPressMovePiece()

    // If can't move piece down, run "hitBottom"
    if (!Data.movePieceDown()) {
      // if we have full Rows, update score
      if (Data.hitBottom()){
        View.updateScore(Data.getScore());
      }
    }

    if(Data.getGameOver()){
      gameOver();
      clearInterval(gameLoop);
      return;
    }

    // TODO: Optimize to just clear last piece position and add new
    // piece posisition unless hit bottom, then re-render board
    View.renderBoard(Data.getBoard());
    View.renderPiece(Data.getActivePiece());
  };

  var gameOver = function gameOver(){
    View.gameOver(Data.getScore());
  }

  var startGame = function startGame(e){
    e.preventDefault();
    clearInterval(gameLoop);

    Data.reset();

    View.renderBoard(Data.getBoard());
    View.renderPiece(Data.getActivePiece());

    gameLoop = setInterval( _gameLoop, SPEED);
  }

  var init = function init(h,w) {
    h = h || 20;
    w = w || 10;

    // Run Initialization
    Data.init(h, w);
    View.init(h, w, {
      keydown: Data.startKey,
      keyup: Data.stopKey,
      startGame: startGame
    });

    View.renderBoard(Data.getBoard());
  }

  return {
          init: init
         }

})(TETRIS.Data, TETRIS.View);

$(document).ready( function() {
  TETRIS.Controller.init();
});
