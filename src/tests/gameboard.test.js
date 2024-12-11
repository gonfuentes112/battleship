import { Gameboard } from "../gameboard";

describe("The gameboard", () => {
  it("constructor creates a gameboard of a provided size filled with empty squares", () => {
    const size = 10;
    const newGameboard = new Gameboard(size);
    expect(newGameboard).toBeInstanceOf(Gameboard);
    expect(newGameboard.size()).toEqual(size);
    expect(newGameboard._board.length).toBe(newGameboard.size());
    newGameboard._board.forEach((column) => {
      expect(column.length).toBe(newGameboard.size());
      column.forEach((square) => {
        expect(square).toBe(Gameboard.EMPTY);
      });
    });
  });

  it("isValidCoord correctly validates coordinates", () => {
    const size = 10;
    const newGameboard = new Gameboard(size);
    expect(newGameboard.isValidCoord(...[0, 5])).toBe(true);
    expect(newGameboard.isValidCoord(...[-1, 5])).toBe(false);
    expect(newGameboard.isValidCoord(...[2, 10])).toBe(false);
    expect(newGameboard.isValidCoord(...[3, -4])).toBe(false);
    expect(newGameboard.isValidCoord(...[5, 11])).toBe(false);
  });

  it("getShipLength calculates length correctly", () => {
    const shipCoordsOne = [
      [5, 6],
      [5, 9],
    ];
    const shipCoordsTwo = [
      [4, 6],
      [9, 6],
    ];
    expect(Gameboard.getShipLength(...shipCoordsOne)).toEqual(4);
    expect(Gameboard.getShipLength(...shipCoordsTwo)).toEqual(6);
  });

  it("getDimensions calculates the corresponding coordinates", () => {
    const shipCoordsOne = [
      [5, 9],
      [5, 6],
    ];
    const shipCoordsTwo = [
      [4, 6],
      [9, 6],
    ];
    expect(Gameboard.getDimensions(...shipCoordsOne)).toEqual([
      [5, 9],
      [5, 8],
      [5, 7],
      [5, 6],
    ]);
    expect(Gameboard.getDimensions(...shipCoordsTwo)).toEqual([
      [4, 6],
      [5, 6],
      [6, 6],
      [7, 6],
      [8, 6],
      [9, 6],
    ]);
  });

  it("canPlaceShip correctly resolves if there is empty space for a ship", () => {
    const size = 10;
    const existingShipCoords = [
      [5, 6],
      [5, 9],
    ];
    const newGameboard = new Gameboard(size);
    expect(newGameboard.canPlaceShip(...existingShipCoords)).toBe(true);
    newGameboard.placeShip(...existingShipCoords);

    const overlapHorizontalCoords = [
      [5, 3],
      [5, 7],
    ];
    const overlapVerticalCoords = [
      [4, 7],
      [7, 7],
    ];
    const noOverlap = [
      [6, 6],
      [6, 9],
    ];

    expect(newGameboard.canPlaceShip(...overlapHorizontalCoords)).toBe(false);
    expect(newGameboard.canPlaceShip(...overlapVerticalCoords)).toBe(false);
    expect(newGameboard.canPlaceShip(...noOverlap)).toBe(true);
  });

  it("places ships in the provided location", () => {
    const size = 10;
    const shipCoords = [
      [5, 6],
      [5, 9],
    ];
    const newGameboard = new Gameboard(size);
    expect(newGameboard._ships.length).toEqual(0);

    newGameboard.placeShip(...shipCoords);
    expect(newGameboard._ships.length).toEqual(1);
    const addedShip = newGameboard._ships[0];

    expect(addedShip.getLength()).toEqual(4);
    expect(addedShip.isSunk()).toBe(false);

    const occupiedSet = new Set();
    const occupiedCords = Gameboard.getDimensions(...shipCoords);
    occupiedCords.forEach((coord) => {
      occupiedSet.add(`${coord}`);
    });

    for (let row = 0; row < size; row++) {
      for (let column = 0; column < size; column++) {
        const coord = [row, column];
        if (occupiedSet.has(`${coord}`)) {
          expect(newGameboard.getValue(...coord)).toEqual(Gameboard.SHIP);
        } else {
          expect(newGameboard.getValue(...coord)).toEqual(Gameboard.EMPTY);
        }
      }
    }
  });
  it("receiveAttack method hits a ship with its coordinates", () => {
    const size = 10;
    const shipCoords = [
      [5, 6],
      [5, 9],
    ];
    const newGameboard = new Gameboard(size);
    newGameboard.placeShip(...shipCoords);
    const addedShip = newGameboard._ships[0];

    newGameboard.receiveAttack(...[5, 9]);

    expect(addedShip._hits).toEqual(1);
    expect(newGameboard.getValue(...[5, 9])).toEqual(Gameboard.HIT);
  });
  it("receiveAttack misses with wrong coordinates", () => {
    const size = 10;
    const shipCoords = [
      [5, 6],
      [5, 9],
    ];
    const newGameboard = new Gameboard(size);
    newGameboard.placeShip(...shipCoords);
    const addedShip = newGameboard._ships[0];

    newGameboard.receiveAttack(...[1, 1]);

    expect(addedShip._hits).toEqual(0);
    expect(newGameboard.getValue(...[1, 1])).toEqual(
      Gameboard.ALREADY_ATTACKED
    );
  });

  it("keeps track of missed attacks", () => {
    const size = 10;
    const newGameboard = new Gameboard(size);

    newGameboard.receiveAttack(...[1, 1]);
    newGameboard.receiveAttack(...[5, 3]);
    newGameboard.receiveAttack(...[2, 4]);
    const attackArray = [`[1,1]`, `[5,3]`, `[2,4]`];
    const attacks = new Set(attackArray);

    for (let row = 0; row < size; row++) {
      for (let column = 0; column < size; column++) {
        const coord = `[${row},${column}]`;
        if (attacks.has(coord)) {
          expect(newGameboard.getValue(row, column)).toBe(
            Gameboard.ALREADY_ATTACKED
          );
        } else {
          expect(newGameboard.getValue(row, column)).toBe(Gameboard.EMPTY);
        }
      }
    }
  });

  it("reports when all ships have been sunk", () => {
    const size = 10;
    const shipOneCoords = [
      [4, 6],
      [4, 8],
    ];
    const shipTwoCoords = [
      [1, 3],
      [2, 3],
    ];
    const newGameboard = new Gameboard(size);
    newGameboard.placeShip(...shipOneCoords);
    newGameboard.placeShip(...shipTwoCoords);

    newGameboard.receiveAttack(...[4, 6]);
    newGameboard.receiveAttack(...[4, 7]);
    newGameboard.receiveAttack(...[4, 8]);
    expect(newGameboard.allShipsSunk()).toBe(false);

    newGameboard.receiveAttack(...[1, 3]);
    newGameboard.receiveAttack(...[2, 3]);
    expect(newGameboard.allShipsSunk()).toBe(true);
  });
});
