import { Gameboard } from "./gameboard";

class Player {
    constructor() {
        this._board = new Gameboard();
    }

    get board() {
        return this._board;
    }
}

export {Player}