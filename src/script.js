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
        // get all pixels into an array
        const pixels = Array.from(document.querySelectorAll('#grid .pixel'));

        var mousePosition = false;
        var interval_;
        /*
function startDraw(e){
    e.preventDefault();
    // listen for each pixel on click
    pixels.forEach(pixel => pixel.addEventListener('mouseover ', () => {
        console.log('click');
        console.log(this);
        pixel.style.backgroundColor = "blue";
    }));
} */
        const changePixelColor = (e) => {
            e.preventDefault();
            if (e.target.classList.contains('pixel')) {
                e.target.style.backgroundColor = 'red';

            }
            console.log('over');
        }
        gridContainer.addEventListener('mousedown', function (e) {
            e.preventDefault();
            console.log('click');
            changePixelColor(e);
            gridContainer.addEventListener('mouseover', changePixelColor);

        });

        gridContainer.onmouseup = function (e) {
            e.preventDefault();
            console.log('mouse up');
            gridContainer.removeEventListener('mouseover', changePixelColor);

            //elem.removeEventListener('mouseout');
        }

        /*
                // listen for each pixel on click
                pixels.forEach(pixel => pixel.addEventListener('mouseover ', () => {
                    console.log('click');
                    console.log(this);
                    pixel.style.backgroundColor = "blue";
                }));
        
        
                gridContainer.addEventListener('click', function (e) {
                    gridContainer.addEventListener('mouseover', function (e) {
                        if (e.target.classList.contains('pixel')) {
                            e.target.style.backgroundColor = 'red';
        
                        }
                        console.log('over');
        
                    }, false);
                }, false);
        
        */
    }
    createGrid(gridElements);
    draw();
}

//play game
game();