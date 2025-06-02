import Ship from "../ship.js";

test("Ship creation", () => {
  const ship = Ship(4);
  expect(ship.shipLength).toBe(4);

  const ship2 = Ship(1);
  expect(ship2.shipLength).toBe(1);
});

test("Ship is sunken", () => {
  const ship = Ship(3);
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.isSunken()).toBe(true);

  const ship2 = Ship(1);
  expect(ship2.isSunken()).toBe(false);
});
