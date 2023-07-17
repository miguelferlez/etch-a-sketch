const grid = document.querySelector('.grid');

function init() {
    setGrid(64);
}

function setGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            grid.appendChild(cell);           
        }
    }
}

window.addEventListener('load', init);