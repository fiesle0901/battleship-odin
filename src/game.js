import Player from "./player.js";
import {renderBoard} from "./dom.js";

//Create boards for player and computer
const player = Player(false)
const computer = Player(true)

//Place ship
player.gameboard.placeShip(0,0,3,"horizontal");
computer.gameboard.placeShip(1,1,3,"horizontal")

const playerBoard = document.querySelector("#player__board");
const computerBoard = document.querySelector("#computer__board")

//Render both gameboards
renderBoard(player.gameboard.board, playerBoard);
renderBoard(computer.gameboard.board, computerBoard, true)

computerBoard.addEventListener("click", (e) => {
  const cell = e.target;

  if (!cell.classList.contains("cell") || cell.classList.contains("hit") || cell.classList.contains("miss")) return;

  const row = +cell.dataset.row;
  const col = +cell.dataset.col;

  playerTurn(row, col)
})

function playerTurn(row, col){
  computer.gameboard.receiveAttack(row, col);
  renderBoard(computer.gameboard.board, computerBoard, true)


  if(computer.gameboard.allShipsSunk()){
    alert("You win!")
    return;
  }

  setTimeout(() => {
    computer.makeRandomMove(player.gameboard)
    renderBoard(player.gameboard.board, playerBoard)
    if (player.board.allShipsSunk()) {
      alert("Computer wins!");
    }
  }, 500);
}

