class Board {
  constructor(id) {
    this.id = id;
    this.rows = 10;
    this.cols = 10;
    this.squareSize = 50;
    this.hitCount = 1;
    this.hitCountBattleship = 0;
    this.j = 0;
    this.i = 0;
    this.gameBoard = [];
    this.hitCount = 1;
    this.direction = 0;
    this.direction2 = 0;
    this.direction3 = 0;
    this._draw();
    this._generate();
    //this._show();
    this._setListeners();
  }

  _draw() {
    let gameBoardContainer = document.getElementById(this.id);
    for (this.i = 0; this.i < this.cols; this.i++) {
      for (this.j = 0; this.j < this.rows; this.j++) {
        let square = document.createElement("div");
        square.classList.add("square");
        square.id = "s" + this.j + this.i; //add id to square
        //grid coordinates
        let topPosition = this.j * this.squareSize;
        let leftPosition = this.i * this.squareSize;
        //display positions
        square.style.top = topPosition + "px";
        square.style.left = leftPosition + "px";
        gameBoardContainer.appendChild(square); //adding square divs
      }
    }
  }

  _generate() {
    this.gameBoard = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    // coordinates and directions of ships

    let battleshipRow = Math.floor(Math.random() * 6);
    let battleshipCol = Math.floor(Math.random() * 6);
    let destroyerRow = Math.floor(Math.random() * 7);
    let destroyerCol = Math.floor(Math.random() * 7);
    let secondDestroyerRow = Math.floor(Math.random() * 7);
    let secondDestroyerCol = Math.floor(Math.random() * 7);
    this.direction = Math.random();
    this.direction2 = Math.random();
    this.direction3 = Math.random();

    //expand battleship
    if (this.direction < 0.5) {
      for (let i = 0; i < 5; i++) {
        this.gameBoard[battleshipRow][battleshipCol + i] = 1;
      }
    } else {
      for (let i = 0; i < 5; i++) {
        this.gameBoard[battleshipRow + i][battleshipCol] = 1;
      }
    }
    // expand destroyer if it doesn't overlap with battleship
    if (this.direction2 < 0.5) {
      for (let i = 0; i < 4; i++) {
        if (this.gameBoard[destroyerRow][destroyerCol + i] === 1) {
          destroyerRow = Math.floor(Math.random() * 7);
          destroyerCol = Math.floor(Math.random() * 7);
          if (i === 0) {
            i = -1;
          } else {
            i = 0;
          }
        }
      }
      for (let j = 0; j < 4; j++) {
        this.gameBoard[destroyerRow][destroyerCol + j] = 1;
      }
    } else {
      for (let i = 0; i < 4; i++) {
        if (this.gameBoard[destroyerRow + i][destroyerCol] === 1) {
          destroyerRow = Math.floor(Math.random() * 7);
          destroyerCol = Math.floor(Math.random() * 7);
          if (i === 0) {
            i = -1;
          } else {
            i = 0;
          }
        }
      }
      for (let j = 0; j < 4; j++) {
        this.gameBoard[destroyerRow + j][destroyerCol] = 1;
      }
    }
    // expand second destroyer if it doesn't overlap with battleship and destroyer
    if (this.direction3 < 0.5) {
      for (let i = 0; i < 4; i++) {
        if (this.gameBoard[secondDestroyerRow][secondDestroyerCol + i] === 1) {
          secondDestroyerRow = Math.floor(Math.random() * 7);
          secondDestroyerCol = Math.floor(Math.random() * 7);
          if (i === 0) {
            i = -1;
          } else {
            i = 0;
          }
        }
      }
      for (let j = 0; j < 4; j++) {
        this.gameBoard[secondDestroyerRow][secondDestroyerCol + j] = 1;
      }
    } else {
      for (let i = 0; i < 4; i++) {
        if (this.gameBoard[secondDestroyerRow + i][secondDestroyerCol] === 1) {
          secondDestroyerRow = Math.floor(Math.random() * 7);
          secondDestroyerCol = Math.floor(Math.random() * 7);
          if (i === 0) {
            i = -1;
          } else {
            i = 0;
          }
        }
      }
      for (let j = 0; j < 4; j++) {
        this.gameBoard[secondDestroyerRow + j][secondDestroyerCol] = 1;
      }
    }
  }

  _show(e) {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        //find ship and make it red
        if (
          this.gameBoard[i][j] === 1 &&
          document.getElementById("s" + i + j).style.background != "red"
        ) {
          document.getElementById("s" + i + j).style.background = "red";
        }
      }
    }
  }

  _setListeners() {
    let squares = document.querySelectorAll(`.square`);
    for (let i = 0; i < squares.length; i++) {
      squares[i].onclick = e => this._fire(e);
    }
  }

  _fire(e) {
    let row = e.currentTarget.id.substring(1, 2);
    let col = e.currentTarget.id.substring(2, 3);
    if (this.gameBoard[row][col] === 0) {
      e.currentTarget.style.background = "#bbb"; //square color no hit
      this.gameBoard[row][col] = 3; // change square value to 3 when missing
    } else if (this.gameBoard[row][col] === 1) {
      e.currentTarget.style.background = "red"; // change color to red when hit
      this.gameBoard[row][col] = 2; // change square value to 2 when hitting
      this.hitCountBattleship++; // increment hitCount
      /*  // if all squares with ships are hit, end game
      if (this.hitCountBattleship === 13) {
        alert("Congrats! You won!");
      } */
    }
     let shots = document.getElementById("shots");
    shots.innerHTML = this.hitCount++ + " shots"; 
  }
  

  _explosion() {}
}
