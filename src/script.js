// Etch a sketch game
const game = () => {

    console.log("hello");
    // init variables/
    const gridElements = 10;
    // draw the grid
    // UI elememts
    const gridContainer = document.getElementById('grid');
    const pixelHTML = document.createElement('div');
    // add grid css to the grid element
    gridContainer.style.gridTemplateColumns = "repeat(" + gridElements + ",1fr)";
    pixelHTML.classList.add('pixel');

    const createGrid = (gridSize) => {
        // create as many div elements as needed for the grid (nb*nb)
        for (i = 0; i < gridSize ** 2; i++) {
            // create a clone each time
            gridContainer.appendChild(pixelHTML.cloneNode(true));
            // gridContainer.append(pixelHTML);
            console.log(i);
        }
    }

    const draw = () => {
        
        // change background color of target via event
        const changePixelColor = (e) => {
            e.preventDefault();
            if (e.target.classList.contains('pixel')) {
                e.target.style.backgroundColor = 'red';

            }
            console.log('over');
        }
        // execute on click
        gridContainer.addEventListener('mousedown', function (e) {
            e.preventDefault();
            // call a first time to change colour on first mousedown
            changePixelColor(e);
            // then continue calling the colorchange on mouse over
            gridContainer.addEventListener('mouseover', changePixelColor);

        });
        // remove event on mouse up
        gridContainer.onmouseup = function (e) {
            gridContainer.removeEventListener('mouseover', changePixelColor);
        }

      
    }
    createGrid(gridElements);
    draw();
}

//play game
game();