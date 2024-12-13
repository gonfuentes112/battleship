export function initializeCpuBoard() {
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
}

export function initializePlayerBoard() {
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

}