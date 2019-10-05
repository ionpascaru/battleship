// grid rows + columns + size of square
let rows = 10;
let cols = 10;
let squareSize = 50;
let hitCount = 1;
let hitCountBattleship = 0;

//container element
let gameBoardContainer = document.getElementById("gameboard");

for (i = 0; i < cols; i++) {
  for (j = 0; j < rows; j++) {
    let square = document.createElement("div");
    gameBoardContainer.appendChild(square); //adding square divs 
    square.id = "s" + j + i; //add id to square
    //grid coordinates
    let topPosition = j * squareSize;
    let leftPosition = i * squareSize;
    //display positions
    square.style.top = topPosition + "px"; 
    square.style.left = leftPosition + "px";
  }
}

//array with status of square:
//0 = emty, 1 = ship part, 2 = sunken ship part, 3 = missed shot

let gameBoard = [
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0]
  ];

  generateBattleships();
  // coordinates and directions of ships
  function generateBattleships(){
    let battleshipRow = battleshipCol = Math.floor(Math.random() * 5) +0;
    let destroyerRow = destroyerCol = Math.floor(Math.random() * 6) + 0;
    let secondDestroyerRow = secondDestroyerCol = Math.floor(Math.random() * 6) +0;
    let direction = Math.random();
    let direction2 = Math.random();
    let direction3 = Math.random();

    //expand battleship
    if (direction < 0.5) { 
      for (i = 0; i < 5; i++) {
        gameBoard[battleshipRow][battleshipCol + i] = 1;
      }
    } else {
      for (i = 0; i < 5; i++) {
        gameBoard[battleshipRow +i] [battleshipCol] = 1;
      }
    }
    // expand destroyer if it doesn't overlap with battleship
    if (direction2 < 0.5) {
      for (let i = 0; i < 4; i++) {
        if (gameBoard[destroyerRow][destroyerCol + i] === 1) {
          destroyerRow = Math.floor(Math.random() * 6) +0;
          destroyerCol = Math.floor(Math.random() * 6) +0;
          if (i === 0) {
            i = -1;
          } else {
            i = 0;
          }
        }
      }
      for (let j = 0; j < 4; j++) {
        gameBoard[destroyerRow][destroyerCol +j] = 1;
      }
     } else {
        for (let i = 0; i < 4; i++) {
          if (gameBoard[destroyerRow +i][destroyerCol] === 1) {
            destroyerRow = Math.floor(Math.random() * 6) +0;
            destroyerCol = Math.floor(Math.random() * 6) +0;
            if (i === 0) {
              i = -1;
            } else {
              i = 0;
            }
          }
        }
        for (let j = 0; j < 4; j++) {
          gameBoard[destroyerRow +j][destroyerCol] = 1;
        }
      }
      // expand second destroyer if it doesn't overlap with battleship and destroyer
      if (direction3 < 0.5) {
        for (let i = 0; i < 4; i++) {
          if (gameBoard[secondDestroyerRow][secondDestroyerCol +i] === 1) {
            secondDestroyerRow = Math.floor(Math.random() * 6) +0;
            secondDestroyerCol = Math.floor(Math.random() * 6) +0;
            if (i === 0) {
              i = -1;
            } else {
              i = 0;
            }
          }
        }
        for (let j = 0; j < 4; j++) {
          gameBoard[secondDestroyerRow][secondDestroyerCol + j] = 1;
        }
      } else {
        for (let i = 0; i < 4; i++) {
          if (gameBoard[secondDestroyerRow +i][secondDestroyerCol] === 1) {
            secondDestroyerRow = Math.floor(Math.random() * 6) +0;
            secondDestroyerCol = Math.floor(Math.random() * 6) +0;
            if (i === 0) {
              i = -1;
            } else {
              i = 0;
            }
          }
        }
        for (let j = 0; j < 4; j++) {
          gameBoard[secondDestroyerRow + j][secondDestroyerCol] = 1;
        }
      }
    }
  
   
show();

  function show(e) {
    for (i = 0; i < cols; i++) {
      for (j = 0; j < rows; j++) {
        //find ship and make it red
        if (
          gameBoard[i][j] === 1 &&
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
        e.target.style.background = "#bbb"; //square color no hit
        gameBoard[row][col] = 3; // change square value to 3 when missing
      } else if (gameBoard[row][col] === 1) {
        e.target.style.background = 'red'; // change color to red when hit
        gameBoard[row][col] = 2; // change square value to 2 when hitting
        hitCountBattleship++; // increment hitCount
        // if all squares with ships are hit, end game
        if (hitCountBattleship === 8) {
          alert("Congrats! You won!");
        }
      }
    }
    let shots = document.getElementById("shots");
    shots.innerHTML = hitCount++ +  " shots";
  }
  