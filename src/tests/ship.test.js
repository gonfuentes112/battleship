import { Ship } from "../ship";

describe("Ship class", () => {
  it("creates a ship element with the given length", () => {
    const newShip = new Ship(5);
    expect(newShip).toBeInstanceOf(Ship);
    expect(newShip.getLength()).toEqual(5);
  });

  it("registers hits correctly", () => {
    const newShip = new Ship(5);
    newShip.hit();
    newShip.hit();
    expect(newShip._hits).toEqual(2);
  });

  it("is not sunk if the number of hits is lower than length", () => {
    const newShip = new Ship(5);
    newShip.hit();
    newShip.hit();
    expect(newShip.isSunk()).toBe(false);
  });

  it("is sunk if the number of hits is equal to length", () => {
    const newShip = new Ship(2);
    newShip.hit();
    newShip.hit();
    expect(newShip.isSunk()).toBe(true);
  });
});
