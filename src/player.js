import Gameboard from "./gameboard.js"

export default function Player(isComputer = false){
  const gameboard = Gameboard();
  const playedMoves = new Set();

  function hasAlreadyAttacked(row, col){
    return playedMoves.has(`${row},${col}`);
  }

  function recordMove(row , col){
    playedMoves.add(`${row},${col}`);
  }

  function castAttack(opponentGameboard, row, col){
    if(hasAlreadyAttacked(row,col)) return false;

    recordMove(row,col);
    opponentGameboard.receiveAttack(row, col);
    return true;
  }

  function makeRandomMove(opponentGameboard){
    let row, col ;
    do{
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
    } while(hasAlreadyAttacked(row,col));

    return castAttack(opponentGameboard, row, col);
  }

  return {
    isComputer,
    gameboard,
    castAttack,
    makeRandomMove,
    playedMoves,
    recordMove
  }
}