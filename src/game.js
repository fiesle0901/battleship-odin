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

let isPlayerTurn = true;
computerBoard.classList.add("cursor-pointer");

computerBoard.addEventListener("click", (e) => {
  if(!isPlayerTurn) return;

  const cell = e.target;

  if (!cell.classList.contains("cell") || cell.classList.contains("hit") || cell.classList.contains("miss")) return;

  const row = +cell.dataset.row;
  const col = +cell.dataset.col;

  const successAttack = player.castAttack(computer.gameboard, row, col)
  if(!successAttack) return;

  console.log(player.playedMoves)
  playerTurn(row, col)
})

function playerTurn(row, col){
  isPlayerTurn = false
  computerBoard.classList.replace("cursor-pointer", "cursor-wait");

  renderBoard(computer.gameboard.board, computerBoard, true)


  if(computer.gameboard.allShipsSunk()){
    alert("You win!")
    return;
  }

  setTimeout(() => {
    computerBoard.style.cursor = "not-allowed"
    computer.makeRandomMove(player.gameboard)
    renderBoard(player.gameboard.board, playerBoard)
    if (player.gameboard.allShipsSunk()) {
      alert("Computer wins!");
      return
    }
    isPlayerTurn = true
    computerBoard.classList.replace("cursor-wait", "cursor-pointer");
  }, 2000);
}

