const grid = document.querySelector('.grid');
const gridSizeSpans = document.getElementsByClassName('size');

const modal = document.querySelector('.modal');
const resizeModal = document.querySelector('.resize-modal');

const applyButton = document.querySelector('.apply-button');
const resizeButton = document.querySelector('.resize-button');
const rainbowButton = document.querySelector('.rainbow-button');
const eraserButton = document.querySelector('.eraser-button');
const linesButton = document.querySelector('.lines-button');
const clearButton = document.querySelector('.clear-button');

const rangeInput = document.querySelector('#rangeInput');
const colorInput = document.querySelector('#colorInput');

let size = 16;
let newSize = 0;
let color = '#000000'
let newColor = '';
let modeIsEraser = false;
let modeIsRainbow = false;
let mouseIsDown = false;
let mouseIsUp = true;

function init() {
    newSize = size;
    newColor = color;

    setGrid(size);

    for (let i = 0; i < gridSizeSpans.length; i++) {
        gridSizeSpans[i].textContent = size;
    }

    resizeButton.addEventListener('click', showResizeModal);
    applyButton.addEventListener('click', resizeGrid);
    rainbowButton.addEventListener('click', () => {
        rainbowButton.classList.toggle('clicked');
        modeIsRainbow = !modeIsRainbow;
        disableEraserMode();
    });
    eraserButton.addEventListener('click', () => {
        eraserButton.classList.toggle('clicked');
        modeIsEraser = !modeIsEraser;
        disableRainbowMode();
    });
    linesButton.addEventListener('click', () => {
        linesButton.classList.toggle('clicked');
        grid.classList.toggle('lines-enabled');

    })
    clearButton.addEventListener('click', reloadGrid);

    rangeInput.addEventListener('input', () => {
        newSize = document.getElementById('rangeInput').value;
    });
    colorInput.addEventListener('input', () => {
        newColor = document.getElementById('colorInput').value;
    })
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
                if (mouseIsDown) {
                    if (modeIsEraser) {
                        draw(cell, 'white');
                    } else if (modeIsRainbow) {
                        draw(cell, "rgb(" + getRandomNumber(1, 255) + "," + getRandomNumber(1, 255) + "," + getRandomNumber(1, 255) + ")");
                    } else {
                        draw(cell, newColor);
                    }
                }
            });
            cell.addEventListener('mousemove', (e) => {
                if (mouseIsDown) {
                    if (modeIsEraser) {
                        draw(cell, 'white');
                    } else if (modeIsRainbow) {
                        draw(cell, "rgb(" + getRandomNumber(1, 255) + "," + getRandomNumber(1, 255) + "," + getRandomNumber(1, 255) + ")");
                    } else {
                        draw(cell, newColor);
                    }
                }
            });
            cell.addEventListener('mouseup', (e) => {
                mouseIsDown = false;
                mouseIsUp = true;
            });
        }
    }
}

function reloadGrid() {
    grid.innerHTML = '';
    setGrid(newSize);
}

function draw(target, color) {
    target.style.backgroundColor = color;
}

function showResizeModal() {
    modal.style.display = 'flex';
    resizeModal.style.display = 'flex';
    modal.addEventListener('click', function (e) {
        if (e.target.matches('.cancel-button') || !e.target.closest('.resize-modal')) {
            closeModal();
        }
    });
}

function resizeGrid() {
    for (let i = 0; i < gridSizeSpans.length; i++) {
        gridSizeSpans[i].textContent = newSize;
    }
    reloadGrid();
    closeModal();
}

function closeModal() {
    modal.style.display = 'none';
}

function disableRainbowMode() {
    modeIsRainbow = false;
    rainbowButton.classList.remove('clicked');
}

function disableEraserMode() {
    modeIsEraser = false;
    eraserButton.classList.remove('clicked');
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener('load', init);