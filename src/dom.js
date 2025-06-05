export function renderBoard(board, containerElement, isEnemy = false){
  containerElement.innerHTML = "";

  for(let row = 0; row < 10; row++){
    for(let col = 0; col < 10; col++){
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = row;
      cell.dataset.col = col; 

      const value = board[row][col];
      if(value === "miss") cell.classList.add("miss");
      else if(value === "hit") cell.classList.add("hit");
      else if(value !== null && !isEnemy) cell.classList.add("ship");

      containerElement.appendChild(cell)
    }
  }
}