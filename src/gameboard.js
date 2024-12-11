import { Ship } from "./ship";

class Gameboard {
    static EMPTY = 0;
    static SHIP = 1;
    static ALREADY_ATTACKED = 2;
    static HIT = 3;

    constructor(size) {
        this._size = size;
        this._board = Array(size)
                            .fill()
                            .map(() => 
                                Array(size).fill(Gameboard.EMPTY)
                                );
        this._ships = [];
        this._coordsWithShips = new Map();
        this._misses = [];
    }

    size() {
        return this._size;
    }

    getValue(row, column) {
        return this._board[row][column];
    }

    static getShipLength(begin, end) {
        const rowLength = Math.abs(end[0] - begin[0]) + 1;
        const columnLength = Math.abs(end[1] - begin[1]) + 1;
        return rowLength !== 1 ? rowLength : columnLength;
    }

    static getDimensions(begin, end) {
        const horizontal = begin[1] === end[1];
        const res = [];
        let offset;
        if (horizontal) {
            offset = begin[0] < end[0] ? 1 : -1;
            if (offset > 0) {
                for (let i = begin[0]; i <= end[0]; i += offset) {
                    res.push([ i, begin[1]]);
                }
            } else {
                for (let i = begin[0]; i >= end[0]; i += offset) {
                    res.push([ i, begin[1]]);
                }
            }

        } else {
            offset = begin[1] < end[1] ? 1 : -1;
            if (offset > 0) {
                for (let i = begin[1]; i <= end[1]; i += offset) {
                    res.push([begin[0], i]);
                }
            } else {
                for (let i = begin[1]; i >= end[1]; i += offset) {
                    res.push([begin[0], i]);
                }
            }

        }
        return res;
    }

    canPlaceShip(begin, end) {
        const shipDimensions = Gameboard.getDimensions(begin, end);
        return shipDimensions.every((coord) => {
            return this.getValue(...coord) === Gameboard.EMPTY;
        })
    }

    placeShip(begin, end) {
        const newShip = new Ship(Gameboard.getShipLength(begin, end));
        this._ships.push(newShip);

        const dimensions = Gameboard.getDimensions(begin, end);
        dimensions.forEach((coord) => {
            const [row, column] = coord;
            this._board[row][column] = Gameboard.SHIP;
            this._coordsWithShips.set(`${coord}`, newShip);
        })
    }

    receiveAttack(row, column) {
        const coord = `${[row, column]}`;
        if (this._coordsWithShips.has(coord)) {
            const hitShip = this._coordsWithShips.get(`${coord}`);
            hitShip.hit();
            this._board[row][column] = Gameboard.HIT;
        } else {
            this._board[row][column] = Gameboard.ALREADY_ATTACKED;
            this._misses.push([row, column]);
        }

    }

    allShipsSunk() {
        return this._ships.every((ship) => ship.isSunk());
    }

}
export {Gameboard};