import { Gameboard } from "./gameboard";
import { Player } from "./player";

function gameLogic() {
    const human = new Player("p1");
    const cpu = new Player("p2");
    let lastCpuAttackSuccess = false;
    let lastCpuAttackCoord;

    const ships = {
        "carrier" : {length : 5},
        "battleship" : {length : 4},
        "destroyer" : {length : 3},
        "submarine" : {length : 3},
        "patrolboat" : {length : 2},
    }

    function getRandomCoord(size) {
        const row = Math.floor(Math.random() * size);
        const column = Math.floor(Math.random() * size);
        return [row, column];
    }

    function getRandomDirection() {
        const signs = [1, -1];
        const axes = [0, 1];
        const randomSignIndex = Math.floor(Math.random());
        const randomAxisIndex = Math.floor(Math.random());

        const sign = signs[randomSignIndex];
        const axis = axes[randomAxisIndex];
        return [sign, axis];
    }

    function getRandomCoordinates(size, length) {
        const [row, column] = getRandomCoord(size);
        const [sign, axis] = getRandomDirection();

        const begin = [row, column];
        let end = [row, column];
        end[axis] += sign * length;

        return [begin, end];
    }

    function getValidCoordinates(board, length) {
        let isValid = false;
        let begin, end;
        const size = board.size();
        while (!isValid) {
            [begin, end] = getRandomCoordinates(size, length);
            isValid = board.canPlaceShip(begin, end);
        }
        return [begin, end];
    }

    function initializeShips(player) {
        const fleetCoords = [];
        ships.forEach((ship) => {
            const playerCoords = getValidCoordinates(player.board, player.length);
            player.board.placeShip(...playerCoords);
            fleetCoords.push(playerCoords);
        })
        return fleetCoords;
    }

    function attack(player, row, column) {
        player.board.receiveAttack(row, column);
        return player.board.getValue(row, column);
    }


    function hasPlayerLost(player) {
        return player.board.allShipsSunk();
    }

    function cpuAttack() {
        let nextCoord;
        if(lastCpuAttackSuccess) {
            let nextValid = false;
            while (!nextValid) {
                nextCoord = lastCpuAttackCoord;
                const [sign, index] = getRandomDirection();
                nextCoord[index] += sign;
                nextValid = (human.board.isValidCoord(nextCoord)
                            && human.board.getValue(nextCoord) !== Gameboard.ALREADY_ATTACKED);
            }            
        } else {
            nextCoord = getRandomCoord(human.board.size());
        }
        const attackResult = attack(human, ...nextCoord);
        lastCpuAttackSuccess = attackResult === Gameboard.HIT;
        lastCpuAttackCoord = nextCoord;

        return attackResult;
       }


    return {
        getRandomCoordinates
    }
}

export {gameLogic}