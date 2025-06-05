import Player from "../src/player.js";

test("Player has its own gameboard", () => {
  const player =  Player();

  expect(player.gameboard).toBeDefined();
})

test("Computer has its own board", () => {
  const player = Player(true)

  expect(player.gameboard).toBeDefined();
})

test("Player can attack another board", () => {
  const player = Player(false);
  const computer = Player(true);

  computer.gameboard.placeShip(0,0,3, "horizontal");
  player.castAttack(computer.gameboard, 0,0)
  expect(computer.gameboard.board[0][0]).toBe("hit");
});

test("Computer can attack player gameboard", () => {
  const player = Player()
  const computer = Player(true)

  player.gameboard.placeShip(0,0,3,"horizontal");
  computer.castAttack(player.gameboard);
  expect(player.gameboard.board[0][0]).toBe("hit");
})