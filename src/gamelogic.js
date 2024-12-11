import { Gameboard } from "./gameboard";
import { Player } from "./player";

function gameLogic() {
    const human = new Player("p1");
    const cpu = new Player("p2");

    const ships = {
        "carrier" : {length : 5},
        "battleship" : {length : 4},
        "destroyer" : {length : 3},
        "submarine" : {length : 3},
        "patrolboat" : {length : 2},
    }

    function getRandomCoordinates(size, length) {
        const row = Math.floor(Math.random() * size);
        const column = Math.floor(Math.random() * size);

        const signs = [1, -1];
        const axes = [0, 1];
        const randomSignIndex = Math.floor(Math.random());
        const randomAxisIndex = Math.floor(Math.random());

        const sign = signs[randomSignIndex];
        const axis = axes[randomAxisIndex];

        const begin = [row, column];
        let end = [row, column];
        end[axis] += sign * length;

        return [begin, end];

    }

    return {
        getRandomCoordinates
    }
}

export {gameLogic}