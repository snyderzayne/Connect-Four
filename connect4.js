/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

let WIDTH = 7; // 7
let HEIGHT = 6; // 6

let currPlayer = 1; // active player: 1 or 2
let board = null; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  // let tempBoard = Array(HEIGHT).fill(Array(WIDTH).fill()); // can't adjust the values with this array
  // return board.push(tempBoard);  ** read line 25 comment **

  // return board.push(Array.from(Array(HEIGHT), () => new Array(WIDTH).fill(undefined)));

  return board = (Array(HEIGHT).fill(null).map(() => Array(WIDTH))); // realized I was pushing a completed 2d array matrix into an empty array causing it to become 3d instead of 2d
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board" 
  let htmlBoard = document.querySelector('#board');

  // TODO: add comment for this code
  let top = document.createElement("tr"); // creating the table row element for the header table 
  top.setAttribute("id", "column-top"); // setting the id for it
  top.addEventListener("click", handleClick); // adding the event listener for a click on one of the table elements

  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td"); // creating the table rows for the header
    headCell.setAttribute("id", x); // setting the id for the row elements to be 'x'
    top.append(headCell); // adding it to the table 'top' 
  }
  htmlBoard.append(top); // adding the created elements to the #board 

  // TODO: add comment for this code
  for (let y = 0; y < HEIGHT; y++) { // looping over the below code in order to create the game board
    const row = document.createElement("tr"); // creating the columns 
    for (var x = 0; x < WIDTH; x++) { // looping over the code below to create the rows in the game board
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`); // setting the ids for each element to be accurate with an array matrix
      row.append(cell); // adding this to the row variable
    }
    htmlBoard.append(row); // adding the created table to the htmlboard
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for (let i = HEIGHT - 1; i >= 0; i--) {
    if (!board[i][x]) {
      return i;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  let tempPiece = document.createElement('div');
  if(currPlayer === 1) {
    tempPiece.classList.add('piece', 'red-game-piece');
  } else {
    tempPiece.classList.add('piece', 'blue-game-piece');
  }
  let clickedSpace = document.getElementById(`${y}-${x}`) // I was trying to use query slector here and I couldn't get it to work
  clickedSpace.append(tempPiece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  return alert('THIS IS THE END');
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);
  board[y][x] = currPlayer;

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (!board.every( xAxis => xAxis.every(yAxis => yAxis)) === null) {
    return endGame();
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  // if (currPlayer === 1) {
  //   currPlayer = 2
  // } else {
  //   currPlayer = 1
  // } // why won't this work
  currPlayer = currPlayer === 1 ? 2 : 1
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) { // if any one of the above variables is true then the game will end. they are each dynamically checking for the possible combinations of 4 variables in a row
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
