// Etch a sketch game
const game = () => {

    console.log("hello");
    // init variables/
    const gridElements = 16;
    const modes = ['colorMode', 'rainbowMode', 'eraserMode'];
    let currentColor = '#333';
    let currentMode = modes[0];
    // draw the grid
    // UI elememts
    const gridContainer = document.getElementById('grid');
    const pixelHTML = document.createElement('div');
    const inputColor = document.getElementById('colorMode');
    const inputGridSize = document.getElementById('grid_size');
    const inputGridSizeValue = document.querySelector('.grid_size_value');
    const btnEraser = document.getElementById('eraserMode');
    const btnRainbow = document.getElementById('rainbowMode');
    const btnClear = document.getElementById('clear');
console.log(inputGridSizeValue);
    
    

    const createGrid = (gridSize) => {
        //reset grid
        gridContainer.innerHTML="";
        // add grid css to the grid element
        gridContainer.style.gridTemplateColumns = "repeat(" + gridSize + ",1fr)";
        pixelHTML.classList.add('pixel');
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
                if (currentMode === 'rainbowMode') {
                    e.target.style.backgroundColor = 'rgb(' + getRandomRGB() + ')';
                } else if (currentMode === 'eraserMode') {
                    e.target.style.backgroundColor = '';
                } else {
                    e.target.style.backgroundColor = currentColor;
                }

            }


        }
        // execute on click
        gridContainer.addEventListener('mousedown', function (e) {
            e.preventDefault();
            // call a first time to change colour on first mousedown
            changePixelColor(e);
            // then continue calling the colorchange on mouse over
            gridContainer.addEventListener('mouseover', changePixelColor);
            console.log(currentMode);
        });
        // remove event on mouse up
        gridContainer.onmouseup = function (e) {
            gridContainer.removeEventListener('mouseover', changePixelColor);
        }


    }

    // update current color
    function updateColor(color) {
        currentColor = color;
    }

    createGrid(gridElements);
    const pixels = Array.from(document.querySelectorAll('#grid .pixel'));
    // update color choice via color picker input
    inputColor.addEventListener('change', (e) => {
        updateColor(e.target.value);
        currentMode = modes[0];
        console.log(currentMode);
    });
    //rainbow mode
    btnEraser.addEventListener('click', () => {
        currentMode = modes[2];
        console.log(currentMode);
    });
    //eraser mode
    btnRainbow.addEventListener('click', () => {
        currentMode = modes[1];
        console.log(currentMode);
    });
    //clear mode
    btnClear.addEventListener('click', () => {
        pixels.forEach(pixel => pixel.style.backgroundColor = "");
    });

    //grid size input
    inputGridSize.addEventListener('input', (e) => {
        
        createGrid(e.target.value);
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
    draw();
    console.log(getRandomRGB());
}

//play game
game();