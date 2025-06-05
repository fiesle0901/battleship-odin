export default function Ship(shipLength) {
  let hits = 0;

  function isSunken() {
    return hits >= shipLength;
  }

  function hit() {
    if (hits < shipLength) {
      hits++;
    }
  }

  return {
    hit,
    shipLength,
    isSunken,
  };
}
