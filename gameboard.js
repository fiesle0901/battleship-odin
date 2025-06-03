import Ship from "./ship.js";

export default function Gameboard() {
  const board = Array.from({ length: 10 }).map(() => Array(10).fill(null));
  const ships = [];
  const missedHits = [];

  function placeShip(startRow, startColumn, length, direction = "horizontal") {
    const ship = new Ship(length);

    const coordinates = [];

    //Check if the ship can be placed
    for (let i = 0; i < length; i++) {
      const row = direction === "horizontal" ? startRow : startRow + i;
      const col = direction === "horizongtal" ? startColumn + i : startColumn;

      //Prevent placing ship outside the board
      if (row >= 10 || col >= 10 || row < 0 || col < 0) {
        return false;
      }

      //Push the coordinates of the ship
      coordinates.push([row, col]);
    }

    coordinates.forEach(([row, col]) => {
      board[row][col] = ship;
    });

    ships.push(ship);
    return true;
  }
}
