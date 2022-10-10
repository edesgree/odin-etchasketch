// Etch a sketch game
const game = () => {

    console.log("hello");
    // init variables/
    const gridElements = 10;
    let currentColor = 'green';
    // draw the grid
    // UI elememts
    const gridContainer = document.getElementById('grid');
    const pixelHTML = document.createElement('div');
    const inputColor = document.getElementById('colorMode');
    // add grid css to the grid element
    gridContainer.style.gridTemplateColumns = "repeat(" + gridElements + ",1fr)";
    pixelHTML.classList.add('pixel');

    const createGrid = (gridSize) => {
        // create as many div elements as needed for the grid (nb*nb)
        for (i = 0; i < gridSize ** 2; i++) {
            // create a clone each time
            gridContainer.appendChild(pixelHTML.cloneNode(true));
        }
    }

    const draw = () => {
        
        // change background color of target via event
        const changePixelColor = (e) => {
            e.preventDefault();
            if (e.target.classList.contains('pixel')) {
                e.target.style.backgroundColor = currentColor;
            }
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
    
    // update current color
    function updateColor(color){
        currentColor = color;
    
    }
    
    createGrid(gridElements);
    // update color choice via color picker input
    inputColor.addEventListener('change', function (e) {
        updateColor(e.target.value);
    });
    draw();
}

//play game
game();