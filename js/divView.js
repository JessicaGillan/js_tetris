var TETRIS = TETRIS || {};

TETRIS.View = (function() {
  var CELL_SIDE = 30,
      gameWrapper = document.getElementsByTagName('tetris')[0],
      score = document.getElementById('score'),
      startBtn = document.getElementById('start');

  var height, width;


  var _addListeners = function _addListeners(listeners) {
    listeners = listeners || {};
    var _this = this;

    if (listeners.keydown) {
      document.body.addEventListener('keydown', function(e) {
        listeners.keydown(e.which || e.keycode);
      });
    }
    if (listeners.keyup) {
      document.body.addEventListener('keyup', function(e) {
        listeners.keyup(e.which || e.keycode);
      });
    }
    if (listeners.startGame) {
      startBtn.addEventListener('click', function(e) {
        listeners.startGame(e);
      });
    }
  };

  var renderBoard = function renderBoard(board) {
    var size = CELL_SIDE,
        square;

    gameWrapper.innerHTML = "";

    for(coord in board) {
      square = document.createElement('DIV');
      square.classList.add('square');
      square.id = coord;

      if (board[coord].value) {
        square.classList.add(board[coord].value)
      }

      square.style.height = size;
      square.style.width = size;
      square.style.top = board[coord].y*size + "px";
      square.style.left = board[coord].x*size + "px";
      square.style.zIndex = '0';

      gameWrapper.appendChild(square);
    }
  }

  var renderPiece = function renderPiece(piece) {
    var i = 0,
        square;

    for ( ; i < piece.cells.length; i++) {
      id = TETRIS.getKey(piece.cells[i].x, piece.cells[i].y);
      square = document.getElementById(id);

      // if square is on board
      if (square) square.classList.add(piece.cells[i].value);
    }
  };

  var init = function init(h,w,listeners) {
    height = h;
    width = w;
    _addListeners(listeners);
  };

  var updateScore = function updateScore(num) {
    score.innerText = "Score: " + num;
  }

  var gameOver = function gameOver(score){
    alert("Game Over. You scored " + score + " points.")
  }

  return {
            init: init,
            renderBoard: renderBoard,
            renderPiece: renderPiece,
            updateScore: updateScore,
            gameOver: gameOver
         };
})();
