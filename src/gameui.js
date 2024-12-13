import { Gameboard } from "./gameboard";
import { gameLogic } from "./gamelogic";

function gameUi() {
    const cpuboard = document.getElementById('cpuboard');
    for (let row = 0; row < 10; row++){
        for (let column = 0; column < 10; column++){
            const cell = document.createElement('div');
            cell.classList.add('cell');
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
            cell.classList.add('cell');
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

    let logic;

    function placeShipsUi() {
        if (startButton.classList.contains('hidden')) {
            startButton.classList.toggle('hidden');
        }
        placeButton.innerText = "Another one";
        const playerCells = document.querySelectorAll('.playerblank');
        playerCells.forEach((cell) => {
            if (cell.innerText !== "") {
                cell.innerText = "";
            }
        })

        logic = gameLogic();

        initializeShipsUi("human");
        initializeShipsUi("cpu");

    }

    function initializeShipsUi(player) {
        if (player === "human") {
            const logicPlayer = logic.getPlayer(player);
            const fleetCoords = logic.initializeShips(logicPlayer);
            fleetCoords.forEach((shipCoords) => {
                shipCoords.forEach((coord) => {
                    const [row, column] = coord;
                    const cell = document.querySelector(`.playerblank[data-row="${row}"][data-column="${column}"]`);
                    cell.innerText = "S";
                })
            })
        } else {
            const logicCpu = logic.getPlayer(player);
            logic.initializeShips(logicCpu);
        }

    }

    function receiveAttackUi(event) {
        const cell = event.target;
        if (!cell.classList.contains('cpublank')) {
            return;
        }
        const cpu = logic.getPlayer('cpu');
        const row = cell.dataset.row;
        const column = cell.dataset.column;
        cell.classList.toggle('cpublank');
        const attackResult = logic.attack(cpu, row, column);
        if (attackResult === Gameboard.ALREADY_ATTACKED) {
            cell.classList.toggle('cpuwater');
        } else {
            cell.classList.toggle('cpuhit');
        }
        if (logic.hasPlayerLost(cpu)) {
            gameOver("You win!");
        }

        cpuAttackUi();
    }

    function startGameUi() {
        placeButton.classList.toggle('hidden');
        startButton.classList.toggle('hidden');
        resetButton.classList.toggle('hidden');
        const cpuBoard = document.getElementById('cpuboard');
        cpuBoard.classList.toggle('cursorenabled');
        cpuBoard.addEventListener('click', (event) => {
            receiveAttackUi(event);
        })
    }

    function gameOver(message) {
        const cpuBoard = document.getElementById('cpuboard');
        cpuBoard.classList.toggle('cursorenabled');
        cpuBoard.setAttribute('inert', true);
        const winnerDiv = document.getElementById('winnerdiv');
        winnerDiv.innerText = message;

    }

    function cpuAttackUi() {
        const {result, coord:[row, column]} = logic.cpuAttack();
        const targetCell = document.querySelector(`.playerblank[data-row="${row}"][data-column="${column}"]`)
        if (result === Gameboard.ALREADY_ATTACKED) {
            targetCell.innerText = "X";
        } else {
            targetCell.classList.toggle('playerhit');
        }
    }

    placeButton.addEventListener('click', placeShipsUi);
    startButton.addEventListener('click', startGameUi);
}

export {gameUi}