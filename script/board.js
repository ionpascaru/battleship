class Board {
  constructor (id) {
    this.id = id;
    this.rows = 10;
    this.cols = 10;
    this.squareSize = 50;
    this.hitCount = 1;
    this.hitCountBattleship = 0;
    this.j = 0;
    this.i = 0;
    this._draw();
    
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

  

}
