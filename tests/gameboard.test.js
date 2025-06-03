import Gameboard from "../gameboard.js";

test("Place ships correctly", () => {
  const gameboard = Gameboard();

  expect(gameboard.placeShip(0, 0, 3)).toBe(true);
  expect(gameboard.placeShip(-1, -1, 3, "horizontal")).toBe(false);

  //Check if the ship on 0,0 can be hit
  expect(typeof gameboard.board[0][0].hit).toBe("function");
});

test("Overlapping ships should not be placed", () => {
  const gameboard = Gameboard();

  expect(gameboard.placeShip(0, 0, 3, "horizontal")).toBe(true);
  expect(gameboard.placeShip(0, 0, 3, "vertical")).toBe(false);
});

test("Ships cant be placed outside the board", () => {
  const gameboard = Gameboard();

  expect(gameboard.placeShip(10, 0, 1)).toBe(false);
  expect(gameboard.placeShip(-1, 0, 3)).toBe(false);
});

//register hit
test("Receive attack on ship", () => {
  const gameboard = Gameboard();

  gameboard.placeShip(0, 0, 3);
  gameboard.receiveAttack(0, 0);
  expect(gameboard.board[0][0]).toBe("hit");

  gameboard.placeShip(1, 1, 3);
  gameboard.receiveAttack(1, 2);
  expect(gameboard.board[1][2]).toBe("hit");
});

//register miss
test("Register miss on empty cell", () => {
  const gameboard = Gameboard();

  gameboard.placeShip(0, 0, 3);
  gameboard.receiveAttack(1, 1);
  expect(gameboard.board[1][1]).toBe("miss");
});

//register all ships sunk
test("Register all ships sunk", () => {
  const gameboard = Gameboard();
  gameboard.placeShip(0, 0, 3, "horizontal");
  gameboard.placeShip(2, 0, 2, "vertical");
  gameboard.placeShip(2, 2, 3, "horizontal");
  gameboard.placeShip(4, 5, 1, "horizontal");
  gameboard.placeShip(5, 1, 3, "horizontal");
  gameboard.placeShip(0, 6, 3, "vertical");

  gameboard.receiveAttack(0, 0);
  gameboard.receiveAttack(0, 1);
  gameboard.receiveAttack(0, 2);
  expect(gameboard.allShipsSunk()).toBe(false);

  gameboard.receiveAttack(2, 0);
  gameboard.receiveAttack(3, 0);

  gameboard.receiveAttack(2, 2);
  gameboard.receiveAttack(2, 3);
  gameboard.receiveAttack(2, 4);

  gameboard.receiveAttack(4, 5);

  gameboard.receiveAttack(0, 6);
  gameboard.receiveAttack(1, 6);
  gameboard.receiveAttack(2, 6);

  gameboard.receiveAttack(5, 1);
  gameboard.receiveAttack(5, 2);
  gameboard.receiveAttack(5, 3);

  expect(gameboard.allShipsSunk()).toBe(true);
});
