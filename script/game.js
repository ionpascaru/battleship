// grid rows + columns + size of square
var rows = 10;
var cols = 10;
var squareSize = 50;

//container element
var gameBoardContainer = document.getElementById("gameboard");

for (i = 0; i < cols; i++) {
  for (j = 0; j < rows; j++){
    var square = document.createElement("div");
    gameBoardContainer.appendChild(square);
    square.id = "s" + j +i;
    var topPosition = j * squareSize;
    var leftPosition = i * squareSize;
    square.style.top = topPosition + "px";
    square.style.left = leftPosition + "px";
  }
}