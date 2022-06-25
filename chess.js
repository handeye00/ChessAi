// HTML elements
var $game_info = $('#game_info')

var $status = $('#status')
var $selected_king = $('#selected_king')
var selected_king_color = ' '

var $selected_algorithm_label= $('#selected_algorithm')
var selected_algorithm = ' '
var $algorithm_selector= $('#algorithm_selector')

var $selected_depth_elem = $('#selected_depth')
var selected_depth

var $computer_color = $('#computer_color')
var $player_color = $('#player_color')

var $reset_game_button = $('#reset_game')

var $board = $('#myBoard')

// Chessboard style
var whiteSquareGrey = '#a9a9a9'
var blackSquareGrey = '#696969'

var squareClass = 'square-55d63'
var squareToHighlight = null
var colorToHighlight = null


// Chess variables
var board = null
var game = new Chess()

var first_start = true
var isEndGame = false

var squareID = [
  ['a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8'],
  ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7'],
  ['a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6'],
  ['a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5'],
  ['a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4'],
  ['a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3'],
  ['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2'],
  ['a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1']
]

// Values
var pawnWeight = 100
var pawnValuesWhite = [
  [0,  0,  0,  0,  0,  0,  0,  0],
  [50, 50, 50, 50, 50, 50, 50, 50],
  [10, 10, 20, 30, 30, 20, 10, 10],
  [5,  5, 10, 27, 27, 10,  5,  5],
  [0,  0,  0, 25, 25,  0,  0,  0],
  [5, -5,-10,  0,  0,-10, -5,  5],
  [5, 10, 10,-25,-25, 10, 10,  5],
  [0,  0,  0,  0,  0,  0,  0,  0]
]
var pawnValuesBlack = pawnValuesWhite.slice().reverse()

var knightWeight = 320
var knightValuesWhite = [
    [-50,-40,-30,-30,-30,-30,-40,-50],
    [-40,-20,  0,  0,  0,  0,-20,-40],
    [-30,  0, 10, 15, 15, 10,  0,-30],
    [-30,  5, 15, 20, 20, 15,  5,-30],
    [-30,  0, 15, 20, 20, 15,  0,-30],
    [-30,  5, 10, 15, 15, 10,  5,-30],
    [-40,-20,  0,  5,  5,  0,-20,-40],
    [-50,-40,-20,-30,-30,-20,-40,-50]
]
var knightValuesBlack = knightValuesWhite.slice().reverse()

var bishopWeight = 330
var bishopValuesWhite = [
    [-20,-10,-10,-10,-10,-10,-10,-20],
    [-10,  0,  0,  0,  0,  0,  0,-10],
    [-10,  0,  5, 10, 10,  5,  0,-10],
    [-10,  5,  5, 10, 10,  5,  5,-10],
    [-10,  0, 10, 10, 10, 10,  0,-10],
    [-10, 10, 10, 10, 10, 10, 10,-10],
    [-10,  5,  0,  0,  0,  0,  5,-10],
    [-20,-10,-40,-10,-10,-40,-10,-20]
]
var bishopValuesBlack = bishopValuesWhite.slice().reverse()

var rookWeight = 500
var rookValuesWhite = [
  [  0,   0,   0,   0,   0,   0,   0,  0],
  [  5,  10,  10,  10,  10,  10,  10,  5],
  [ -5,   0,   0,   0,   0,   0,   0, -5],
  [ -5,   0,   0,   0,   0,   0,   0, -5],
  [ -5,   0,   0,   0,   0,   0,   0, -5],
  [ -5,   0,   0,   0,   0,   0,   0, -5],
  [ -5,   0,   0,   0,   0,   0,   0, -5],
  [  0,   0,   0,   5,   5,   0,   0,  0]
]
var rookValuesBlack = rookValuesWhite.slice().reverse()

var queenWeight = 900
var queenValuesWhite = [
  [-20, -10, -10,   -5,   -5,  -10,  -10,  -20],
  [-10,   0,   0,    0,    0,    0,    0,  -10],
  [-10,   0,   5,    5,    5,    5,    0,  -10],
  [-5,    0,   5,    5,    5,    5,    0,   -5],
  [ 0,    0,   5,    5,    5,    5,    0,   -5],
  [-10,   5,   5,    5,    5,    5,    0,  -10],
  [-10,   0,   5,    0,    0,    0,    0,  -10],
  [-20, -10, -10,   -5,   -5,  -10,  -10,  -20]
]
var queenValuesBlack = queenValuesWhite.slice().reverse()

var kingWeight = 20000
var kingValuesWhite = [
  [-30, -40, -40, -50, -50, -40, -40, -30],
  [-30, -40, -40, -50, -50, -40, -40, -30],
  [-30, -40, -40, -50, -50, -40, -40, -30],
  [-30, -40, -40, -50, -50, -40, -40, -30],
  [-20, -30, -30, -40, -40, -30, -30, -20],
  [-10, -20, -20, -20, -20, -20, -20, -10], 
  [20,  20,   0,   0,   0,   0,  20,  20],
  [20,  30,  10,   0,   0,  10,  30,  20]
]
var kingValuesBlack = kingValuesWhite.slice().reverse()

var kingValuesWhiteEndGame = [
  [-50,-40,-30,-20,-20,-30,-40,-50],
  [-30,-20,-10,  0,  0,-10,-20,-30],
  [-30,-10, 20, 30, 30, 20,-10,-30],
  [-30,-10, 30, 40, 40, 30,-10,-30],
  [-30,-10, 30, 40, 40, 30,-10,-30],
  [-30,-10, 20, 30, 30, 20,-10,-30],
  [-30,-30,  0,  0,  0,  0,-30,-30],
  [-50,-30,-30,-30,-30,-30,-30,-50]
]
var kingValuesBlackEndGame = kingValuesWhiteEndGame.slice().reverse()

/* Handle HTML button Click */
$(document).ready(function() {
  $("#black_king").click(function(){
    selected_king_color = 'Black'
    $selected_king.html('Hai selezionato: Nero')
  }); 

  $("#white_king").click(function(){
    selected_king_color = 'White'
    $selected_king.html('Hai selezionato: Bianco')
  }); 

  $("#reset_game").click(function(){

    // Check user input
    if(selected_king_color === ' '){
      alert('Non hai selezionato il turno d\'inizio')
      return
    }

    // Handle first start
    if(first_start){
      first_start = false
      $reset_game_button.html('Ricomincia partita')
      $("#game_info").show();
    }

    // Game start
    board.start(true)
    game.reset()

    selected_algorithm = document.getElementById('algorithm_selector').value
    $selected_algorithm_label.html('Algoritmo selezionato: ' + selected_algorithm)

    selected_depth = document.getElementById('depth').value
    $selected_depth_elem.html('Difficoltà di gioco: ' + selected_depth)

    // HTML init
    if (selected_king_color === 'Black'){
      $player_color.html('Player: Nero')
      $computer_color.html('Computer: Bianco')
    
      board.orientation('black')
      window.setTimeout(makeBestMove, 250)
      updateStatus()
    }else {
      $player_color.html('Player: Bianco')
      $computer_color.html('Computer: Nero')
      
      board.orientation('white')
    }

    isEndGame = false
    // Turn init html
    
    if(selected_algorithm === 'cpu-vs-cpu')
      cpuVsCpu()

    updateStatus()
  }); 
});
/*   */

/* Css utils */
function removeGreySquares () {
  $('#myBoard .square-55d63').css('background', '')
}

function greySquare (square) {
  var $square = $('#myBoard .square-' + square)

  var background = whiteSquareGrey
  if ($square.hasClass('black-3c85d')) {
    background = blackSquareGrey
  }

  $square.css('background', background)
}

var higlightMove = function (move) {
  if (move.color === 'b') {
    $board.find('.' + squareClass).removeClass('highlight-black')
    $board.find('.square-' + move.from).addClass('highlight-black')
    squareToHighlight = move.to
    colorToHighlight = 'black'
  
    $board.find('.square-' + squareToHighlight)
    .addClass('highlight-' + colorToHighlight)
  } else {
    $board.find('.' + squareClass).removeClass('highlight-white')
    $board.find('.square-' + move.from).addClass('highlight-white')
    squareToHighlight = move.to
    colorToHighlight = 'white'
  
    $board.find('.square-' + squareToHighlight)
        .addClass('highlight-' + colorToHighlight)
  }
}
/* */

var bestMove
function handleComputerTurn(selected_algorithm, selected_depth){

  analyzedMoves = 0
  var beforeTurnDate = new Date().getTime();

  if(selected_algorithm === 'min-max'){
      maxVal(selected_depth, true)
  }else if (selected_algorithm === 'alpha-beta'){
      maxValAlphaBeta(selected_depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, true)
  }

  var afterTurnDate = new Date().getTime()
  var computerTimer = (afterTurnDate - beforeTurnDate) / 1000

  $('#computer_timer').text( 'Tempo impiegato: ' + computerTimer + ' secondi')
  $('#computer_analyzed_moves').text( 'Mosse analizzate: ' + analyzedMoves)

}

var makeBestMove = function () {
  handleComputerTurn(selected_algorithm, selected_depth)
  var move = game.move(bestMove)
  higlightMove(move)
  board.position(game.fen())
  isEndGame = checkEndGame()
  updateStatus()
};

var analyzedMoves;

/* Chess IA methods */
var minMaxTurn = false
function cpuVsCpu (){
  bestMove = null
    if(minMaxTurn){
      handleComputerTurn('min-max', selected_depth)
      minMaxTurn = false
    } else {
      handleComputerTurn('alpha-beta', selected_depth)
      minMaxTurn = true
    }
    var move = game.move(bestMove)
    board.position(game.fen())
    isEndGame = checkEndGame()
    higlightMove(move)
    updateStatus()

    setTimeout(cpuVsCpu, 1000)
}

var miniMaxColor = null
var maxVal = function (depth, isRoot) {
  analyzedMoves++;

  if (depth === 0) 
    return evaluation(game, miniMaxColor)
  
  if (isRoot)
    miniMaxColor = game.turn()


  var maxValue = Number.NEGATIVE_INFINITY
  
  const moves = game.moves()
  for(var i = 0; i < moves.length; i++) {
    game.move(moves[i])
    var moveValue = minVal(depth - 1);

    if (moveValue > maxValue) {
      maxValue = moveValue
      if(isRoot) {
        bestMove = moves[i]
      }
    }

    game.undo()
  }
  
  return maxValue;
}

var minVal = function (depth, isRoot) {
  analyzedMoves++;;

  if (depth === 0) {
    return evaluation(game, miniMaxColor)
  }
  
  var minValue = Number.POSITIVE_INFINITY

  const moves = game.moves()
  for(var i = 0; i < moves.length; i++) {
    game.move(moves[i])

    var moveValue = maxVal(depth - 1, false);
    if (moveValue < minValue) {
      minValue = moveValue
      if(isRoot) {
        bestMove = moves[i]
      }
    }
    
    game.undo()
  }
  
  return minValue;
}

var alphaBetaColor
var maxValAlphaBeta = function (depth, alpha, beta, isRoot) {
  analyzedMoves++;

  if (depth === 0) 
    return evaluation(game, alphaBetaColor)

  if (isRoot)
    alphaBetaColor = game.turn()

  
  var maxValue = Number.NEGATIVE_INFINITY
  
  var moves = game.moves()
  for(var i = 0; i < moves.length; i++) {

    game.move(moves[i])

    var moveValue = minValAlphaBeta(depth - 1, alpha, beta);

    if (moveValue > maxValue) {
      maxValue = moveValue
      if(isRoot) 
        bestMove = moves[i]
    }

    // update alpha
    if (moveValue > alpha)
      alpha = moveValue

    game.undo()

    // beta pruning
    if(moveValue >= beta) 
      break
    
  }
  
  return maxValue
}

var minValAlphaBeta = function (depth, alpha, beta) {
  analyzedMoves++;

  if (depth === 0) 
    return evaluation(game, alphaBetaColor)
  
  
  var minValue = Number.POSITIVE_INFINITY

  var moves = game.moves()
  for(var i = 0; i < moves.length; i++) {

    game.move(moves[i])


    var moveValue = maxValAlphaBeta(depth - 1, alpha, beta, false);

    if (moveValue < minValue) {
      minValue = moveValue
    }
    
    // update beta
    if (moveValue < beta)
      beta = moveValue
  
    game.undo()
  
    // alpha pruning
    if(moveValue <= alpha) 
      break
  }
  
  return minValue
}

function checkEndGame() {
  var history = game.history({verbose: true});
  var initial = {w: {p: 0, n: 0, b: 0, r: 0, q: 0},
               b: {p: 0, n: 0, b: 0, r: 0, q: 0}};

  var captured = history.reduce(function(acc, move) {
    if ('captured' in move) {
      var piece = move.captured;
      // switch colors since the history stores the color of the player doing the
      // capturing, not the color of the captured piece
      var color = move.color == 'w' ? 'b' : 'w';
      acc[color][piece] += 1;
      return acc;
    } else {
      return acc;
    }
  }, initial);

  return ((32 - captured) <= 10)
}

var pieceScoreEvaluation = function(piece, x, y, color) {
  if (piece === null) {
    return 0
  } 
  
  // add piece weight value to the evaluation
  pieceWeight = 0
  // add position weight value to the evaluation
  positionWeight = 0

  if (piece.type === 'p') {
    pieceWeight = pawnWeight 
    positionWeight = ((piece.color === 'w')? pawnValuesWhite[y][x] : pawnValuesBlack[y][x]) 
    // pawns on rook columns are worth 15% less because they can only attack one way
    if (x === 0 || x === 7 ) {
      pieceWeight -= 15
    }
  
  } else if (piece.type === 'r') {
    pieceWeight = rookWeight 
    positionWeight = ((piece.color === 'w')? rookValuesWhite[y][x] : rookValuesBlack[y][x])

  } else if (piece.type === 'n') {
    pieceWeight = knightWeight 
    positionWeight = ((piece.color === 'w')? knightValuesWhite[y][x] : knightValuesBlack[y][x])

  } else if (piece.type === 'b') {
    pieceWeight = bishopWeight 
    positionWeight = ((piece.color === 'w')? bishopValuesWhite[y][x] : bishopValuesBlack[y][x])

  } else if (piece.type === 'q') {
    pieceWeight = queenWeight
    positionWeight = ((piece.color === 'w')? queenValuesWhite[y][x] : queenValuesBlack[y][x])

  } else if (piece.type === 'k') {
    pieceWeight = kingWeight 
    positionWeight = ((piece.color === 'w')? kingValuesWhite[y][x] : kingValuesBlack[y][x])

  }
  
  if (isEndGame) {
    if (piece.type === 'k') {
      positionWeight = ((piece.color === 'w')? kingValuesWhiteEndGame[y][x] : kingValuesBlackEndGame[y][x])
  
    } else if (piece.type === 'b') {
        pieceWeight += 10
        // bishops are stronger in end-game
    } else if (piece.type === 'n') {
        pieceWeight -= 10
        // knights are weaker in end-game
    }
  }
  
  var absoluteValue = pieceWeight + positionWeight

  if(selected_algorithm === 'cpu-vs-cpu') {
    if(color === 'b')
      return piece.color === 'b' ? absoluteValue : -absoluteValue
    else if(color === 'w')
    return piece.color === 'w' ? absoluteValue : -absoluteValue

  } else if (selected_king_color === 'White') {
    return piece.color === 'b' ? absoluteValue : -absoluteValue
  } else if (selected_king_color === 'Black') {
    return piece.color === 'w' ? absoluteValue : -absoluteValue
  } 

}

var evaluation = function(game, color) {
  var boardEvaluation  = 0;
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      boardEvaluation = boardEvaluation + pieceScoreEvaluation(game.board()[i][j], i ,j, color);
    }
}
return boardEvaluation;
}
/* */

/* Chess events */
function onDragStart (source, piece) {
  
  // do not pick up pieces if the game is over
  if (game.game_over()) return false

  // or if it's not that side's turn
  if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
      (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
    return false
  }
}

function onDrop (source, target) {
  removeGreySquares()

  // see if the move is legal
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  })

  // illegal move
  if (move === null) return 'snapback'

  higlightMove(move)  
  window.setTimeout(makeBestMove, 250);
  updateStatus()
}

function onSnapEnd () {
  board.position(game.fen())
}

function updateStatus () {
  var moveColor = 'Bianco'
  if (game.turn() === 'b') {
    moveColor = 'Nero'
  }
  var status = ''

  // checkmate?
  if (game.in_checkmate()) {
    status = 'Game over, ' + 'Scacco matto per il ' +  moveColor + '.'
  }

  // draw?
  else if (game.in_draw()) {
    status = 'Game over, patta'
  }

  // game still on
  else {
    status = 'Turno: ' +  moveColor + ' a muovere.'

    // check?
    if (game.in_check()) {
      status += ', Scacco al re ' + moveColor
    }
  }

  $status.html(status)
}

function onMouseoverSquare (square, piece) {
  // get list of possible moves for this square
  var moves = game.moves({
    square: square,
    verbose: true
  })

  // exit if there are no moves available for this square
  if (moves.length === 0) return

  // highlight the square they moused over
  greySquare(square)

  // highlight the possible squares for this piece
  for (var i = 0; i < moves.length; i++) {
    greySquare(moves[i].to)
  }
}

function onMouseoutSquare (square, piece) {
  removeGreySquares()
}
/* */

/* Game init */
var config = {
  draggable: true,
  orientation: 'white',
  moveSpeed: 'fast',
  snapbackSpeed: 500,
  snapSpeed: 100,
  onDragStart: onDragStart,
  onDrop: onDrop,
  onMouseoutSquare: onMouseoutSquare,
  onMouseoverSquare: onMouseoverSquare,
  onSnapEnd: onSnapEnd
}

board = Chessboard('myBoard', config)
updateStatus()
/* */
