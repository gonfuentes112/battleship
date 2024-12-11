import { Gameboard } from "./gameboard";

class Player {
    constructor(name) {
        this._name = name;
        this._board = new Gameboard();
    }

    get name() {
        return this._name;
    }

    get board() {
        return this._board;
    }
}

export {Player}