const grid = document.querySelector('.grid');
let mouseIsDown = false;
let mouseIsUp = true;

function init() {
    setGrid(16);
}

function setGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');

            // Prevents each cell to be dragged and dropped instead of calling the mouse events
            cell.addEventListener("dragstart", (e) => {
                e.preventDefault();
            });
            cell.addEventListener('drop', (e) => {
                e.preventDefault();
            });

            grid.appendChild(cell);

            //Mouse events to paint the cell when holding click down and stop in click up
            cell.addEventListener('mousedown', (e) => {
                mouseIsDown = true;
                mouseIsUp = false;
            });
            cell.addEventListener('mousemove', (e) => {
                if (mouseIsDown) {
                    draw(cell,'black');
                }
            });
            cell.addEventListener('mouseup', (e) => {
                mouseIsDown = false;
                mouseIsUp = true;
            });
        }
    }
}

function draw(target,color) {
    target.style.backgroundColor = color;
}

window.addEventListener('load', init);