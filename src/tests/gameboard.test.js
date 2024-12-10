import { Gameboard } from "../gameboard";

describe('The gameboard', () => {
    it('constructor creates a gameboard of a provided size filled with empty squares', () => {
        const size = 10;
        const newGameboard = new Gameboard(size);
        expect(newGameboard).toBeInstanceOf(Gameboard);
        expect(newGameboard.size()).toEqual(size);
        expect(newGameboard._board.length).toBe(newGameboard.size());
        newGameboard._board.forEach((column) => {
            expect(column.length).toBe(newGameboard.size());
            column.forEach((square) => {
                expect(square).toBe(Gameboard.EMPTY);
            })
        })
    })
    it('places ships in the provided location', () => {
        const size = 10;
        const shipCoords = [[5, 6], [5, 9]];
        const newGameboard = new Gameboard(size);
        expect(newGameboard._ships.length).toEqual(0);

        newGameboard.placeShip(...shipCoords);
        expect(newGameboard._ships.length).toEqual(1);
        const addedShip = newGameboard._ships[0];

        expect(addedShip.getLength()).toEqual(4);
        expect(addedShip.isSunk()).toBe(false);

        const occupiedSet = new Set();
        const occupiedCords = newGameboard.getDimensions(...shipCoords);
        occupiedCords.forEach((coord) => {
            occupiedSet.add(`${coord}`)
        })

        for (let row = 0; row < size; row++) {
            for (let column = 0; column < size; column++) {
                const coord = [row, column];
                if (occupiedSet.has(`${coord}`)) {
                    expect(newGameboard.getValue(...coord)).toEqual(Gameboard.SHIP);
                } else {
                    console.log(`coord: ${coord}, value: ${newGameboard.getValue(...coord)}`)
                    expect(newGameboard.getValue(...coord)).toEqual(Gameboard.EMPTY);
                }
            }            
        }

    })
    it('receiveAttack method hits a ship with its coordinates', () => {})
    it('receiveAttack misses with wrong coordinates', () => {})
    it('keeps track of missed attacks', () => {})
    it('reports when all ships have been sunk', () => {})
})