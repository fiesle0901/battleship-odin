import Gameboard from "./gameboard.js"

export default function Player(isComputer = false){
  const gameboard = Gameboard();

  function castAttack(opponentGameboard, row, col){
    if(isComputer){
      //fixed coordinates for testing, randomize later
      const row = 0;
      const col = 0;

      return opponentGameboard.receiveAttack(row, col);
    } 

    return opponentGameboard.receiveAttack(row,col);
  }

  return {
    isComputer,
    gameboard,
    castAttack
  }
}