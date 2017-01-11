var TETRIS = TETRIS || {};
TETRIS.controller = (function(data) {
  'use strict';

  // Run Initialization
  data.init(10);
  view.renderBoard(data.board);

})(TETRIS.data);
