import { gameLogic } from "./gamelogic";

function gameUi() {
    const cpuboard = document.getElementById('cpuboard');
    for (let row = 0; row < 10; row++){
        for (let column = 0; column < 10; column++){
            const cell = document.createElement('div');
            cell.classList.add('cpublank');
            cell.dataset.row = row;
            cell.dataset.column = column;
            cpuboard.appendChild(cell)
        }
    }
    const playerboard = document.getElementById('playerboard');
    for (let row = 0; row < 10; row++){
        for (let column = 0; column < 10; column++){
            const cell = document.createElement('div');
            cell.classList.add('playerblank');
            cell.dataset.row = row;
            cell.dataset.column = column;
            playerboard.appendChild(cell)
        }
    }

    const startButton = document.getElementById('start');
    const resetButton = document.getElementById('reset');
    startButton.classList.toggle('hidden');
    resetButton.classList.toggle('hidden');
    const placeButton = document.getElementById('place');

    let logic = gameLogic();

    function placeShipsUi() {
        if (startButton.classList.contains('hidden')) {
            startButton.classList.toggle('hidden');
        }

    }

    placeButton.addEventListener('click', placeShipsUi);
}

export {gameUi}