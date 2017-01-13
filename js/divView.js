var TETRIS = TETRIS || {};
TETRIS.View = (function() {
  var CELL_SIDE = 30;

  var gameWrapper = document.getElementsByTagName('tetris')[0];
  var score = document.getElementById('score');

  var _addListeners = function _addListeners(listeners) {
    listeners = listeners || {};
    var _this = this;

    if (listeners.keydown) {
      document.body.addEventListener('keydown', function(e) {
        listeners.keydown(e.which || e.keycode);
      });
      document.body.addEventListener('keyup', function(e) {
        listeners.keyup(e.which || e.keycode);
      });
    }
  };

  var renderBoard = function renderBoard(board, h,w) {
    gameWrapper.innerHTML = "";
    var size = CELL_SIDE;


    var cell;
    for(coord in board) {
      cell = document.createElement('DIV');
      cell.classList.add('cell');

      if (board[coord].value) {
        cell.classList.add(board[coord].value)
      };

      cell.style.height = size;
      cell.style.width = size;
      cell.style.top = board[coord].y*size + "px";
      cell.style.left = board[coord].x*size + "px";

      gameWrapper.appendChild(cell);
    }
  }


  var init = function init(listeners) {
    _addListeners(listeners);
  };

  var updateScore = function updateScore(num) {
    score.innerText = "Score: " + num;
  }

  return {
            init: init,
            renderBoard: renderBoard,
            updateScore: updateScore
            // addPiece: addPiece,
            // movePieceRight: movePieceRight,
            // movePieceLeft: movePieceLeft,
            // movePieceDown: movePieceDown,
            // rotatePieceR: rotatePieceR
         };
})();
