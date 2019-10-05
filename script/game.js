// grid rows + columns + size of square
let rows = 10;
let cols = 10;
let squareSize = 50;
let hitCountBattleship = 0;

//container element
let gameBoardContainer = document.getElementById("gameboard");

for (i = 0; i < cols; i++) {
  for (j = 0; j < rows; j++) {
    let square = document.createElement("div");
    gameBoardContainer.appendChild(square);
    square.id = "s" + j + i;
    let topPosition = j * squareSize;
    let leftPosition = i * squareSize;
    square.style.top = topPosition + "px";
    square.style.left = leftPosition + "px";
  }
}

//array with status of square:
//0 = emty, 1 = ship part, 2 = sunken ship part, 3 = missed shot

let gameBoard = [
  [0,0,1,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,1,0,0,0,0,0,0,0],
  [0,0,1,0,0,0,0,0,0,0],
  [0,0,1,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,1,1,1,0,0]
  ];

  generateBattleships();

  function generateBattleships(){
    return gameBoard;
  }
   
//show();

  function show(e) {
    for (i = 0; i < cols; i++) {
      for (j = 0; j < rows; j++) {
        //find ship and make it red
        if (
          gameBoard[i][j] == 1 &&
          document.getElementById("s" + i + j).style.background != "red"
        ) {
          document.getElementById("s" + i + j).style.background = "red";
        }
      }
    }
  }

  gameBoardContainer.addEventListener("click", fire, false);

  function fire(e) {
    if (e.target !== e.currentTarget) {
      let row = e.target.id.substring(1, 2);
      let col = e.target.id.substring(2, 3);
      if (gameBoard[row][col] === 0) {
        e.target.style.background = "#bbb";
        // change square value to 3 when missing
        gameBoard[row][col] = 3;
      } else if (gameBoard[row][col] === 1) {
        e.target.style.background = 'red'; // change color to red when hit
        // change square value to 2 when hitting
        gameBoard[row][col] = 2;
        hitCountBattleship++; // increment hitCount
        // if all squares with ships are hit, end game
        if (hitCountBattleship === 8) {
          alert("Congrats! You won!");
        }
      }
    }
  }
  