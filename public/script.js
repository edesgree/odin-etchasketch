// Etch a sketch game
const game = () => {

    // init variables/
    const gridElements = 16;
    const modes = ['colorMode', 'rainbowMode', 'eraserMode'];
    let currentColor = '#333';
    let currentMode = modes[0];

    // UI elememts
    const gridContainer = document.getElementById('grid');
    const pixelHTML = document.createElement('div');
    const inputColor = document.getElementById('colorMode');
    const inputGridSize = document.getElementById('grid_size');
    const inputGridSizeValue = document.querySelector('.grid_size_value');
    const btnEraser = document.getElementById('eraserMode');
    const btnRainbow = document.getElementById('rainbowMode');
    const btnClear = document.getElementById('clear');

    // display default grid size value in html
    inputGridSizeValue.innerHTML = gridElements;
    inputGridSize.value = gridElements;

    // grid creation function
    const createGrid = (gridSize) => {
        //reset grid
        gridContainer.innerHTML = "";
        // add grid css to the grid element
        gridContainer.style.gridTemplateColumns = "repeat(" + gridSize + ",1fr)";
        pixelHTML.classList.add('pixel');
        // create as many div elements as needed for the grid (nb*nb)
        for (i = 0; i < gridSize ** 2; i++) {
            // create a clone each time
            gridContainer.appendChild(pixelHTML.cloneNode(true));
        }
    }

    //draw function
    const draw = () => {

        // change background color of target via event
        const changePixelColor = (e) => {
            e.preventDefault();
            // check if target is a pixel (.pixel)
            if (e.target.classList.contains('pixel')) {
                // rainbow mode: change color to random RGB value
                if (currentMode === 'rainbowMode') {
                    e.target.style.backgroundColor = 'rgb(' + getRandomRGB() + ')';
                }
                // eraser mode: change color to empty
                else if (currentMode === 'eraserMode') {
                    e.target.style.backgroundColor = '';
                }
                // normal color mode: get the current color
                else {
                    e.target.style.backgroundColor = currentColor;
                }
            }
        }
        // When mousedown on the grid...
        gridContainer.addEventListener('mousedown', function (e) {
            e.preventDefault();
            // call a first time to change colour on first mousedown
            changePixelColor(e);
            // then continue calling the colorchange on mouse over
            gridContainer.addEventListener('mouseover', changePixelColor);
        });
        // remove event on mouse up
        gridContainer.onmouseup = function () {
            gridContainer.removeEventListener('mouseover', changePixelColor);
        }
    }

    // update current color
    function updateColor(color) {
        currentColor = color;
    }
    // create grid
    createGrid(gridElements);

    // update color choice via color picker input
    inputColor.addEventListener('change', (e) => {
        updateColor(e.target.value);
        currentMode = modes[0];
    });

    //eraser mode
    btnEraser.addEventListener('click', () => {
        currentMode = modes[2];
    });

    //rainbow mode
    btnRainbow.addEventListener('click', () => {
        currentMode = modes[1];
    });

    //clear mode
    btnClear.addEventListener('click', () => {
        // get all pixels in an array
        let pixels = Array.from(document.querySelectorAll('#grid .pixel'));
        // assign empty to each pixel bg color
        pixels.forEach(pixel => pixel.style.backgroundColor = "");
    });

    //change of grid size when user use the range input
    inputGridSize.addEventListener('input', (e) => {
        // create new grid with new size
        createGrid(e.target.value);
        // let the user know the grid size when input is changed
        inputGridSizeValue.innerHTML = e.target.value;
    });

    // getting random number between 2 values (useful for random RGB color)
    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
    }

    // getting a random RGB value
    function getRandomRGB() {
        let arrayRGB = [getRandomIntInclusive(0, 255), getRandomIntInclusive(0, 255), getRandomIntInclusive(0, 255)];
        // return RGB values (255,255,255)
        return arrayRGB.join();
    }
    // call the draw function
    draw();
}

//play game
game();