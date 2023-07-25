const grid = document.querySelector('.grid');
const gridSizeSpans = document.getElementsByClassName('size');
const modal = document.querySelector('.modal');
const resizeModal = document.querySelector('.resize-modal');
const applyButton = document.querySelector('.apply-button');
const resizeButton = document.querySelector('.resize-button');
const rangeInput = document.querySelector('#rangeInput');
const clearButton = document.querySelector('.clear-button');
let newSize = 0;
let size = 16;
let mouseIsDown = false;
let mouseIsUp = true;

function init() {
    newSize = size;
    resizeButton.addEventListener('click', showResizeModal);
    applyButton.addEventListener('click', resizeGrid);
    clearButton.addEventListener('click', reloadGrid);
    for (let i = 0; i < gridSizeSpans.length; i++) {
        gridSizeSpans[i].textContent = size;
    }
    setGrid(size);
    rangeInput.addEventListener('input', () => {
        newSize = document.getElementById('rangeInput').value;
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
            });
            cell.addEventListener('mousemove', (e) => {
                if (mouseIsDown) {
                    draw(cell, 'black');
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

window.addEventListener('load', init);