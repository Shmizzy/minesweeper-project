
let gridArray = [];
const button = document.querySelector('#start-button');
const gameGrid = document.querySelector('#game-grid');

button.addEventListener('click', ()=> startGame());

const generateGrid = () => {
  
    
    for(let i = 0; i < 10; i++){
        gridArray[i] = []
        for(let j = 0; j < 10; j++){
            const tile = document.createElement('div');
            tile.classList.add(`unrevealed`);
            tile.dataset.xy = `${i},${j}`;
            tile.innerHTML = `${i},${j}`;
            gridArray[i][j] = {
                adjacentBombs: 0,
                isRevealed: false,
                isBomb: false
            };

            gameGrid.appendChild(tile);

            tile.addEventListener('click', () => reveal(i, j));




        }
    }

    for(let bomb = 0; bomb <= 20; bomb++){
        let randomRow = Math.floor(Math.random() * 10);
        let randomColumn = Math.floor(Math.random() * 10);
        gridArray[randomRow][randomColumn].isBomb = true;
    }
   

    console.log(gridArray)

}


const reveal = (x,y) => {
    
    const grabTile = document.querySelector(`.unrevealed[data-xy="${x},${y}"]`);
    
    if(!gridArray[x][y].isRevealed){
        if(gridArray[x][y].isBomb === false){
            grabTile.classList.replace('unrevealed','revealed');
            gridArray[x][y].isRevealed = true;
            checkAdjacentTiles(x,y);
        }else{
            grabTile.classList.replace('unrevealed','bomb');
            gridArray[x][y].isRevealed = true;
            revealAllBombs();
        }
    }
    
}

const checkAdjacentTiles = (x,y) => {



}

const revealAllBombs = () => {


    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++){
            const btile = gridArray[i][j]
            if(btile.isBomb && !btile.isRevealed){
                const grabBomb = document.querySelector(`.unrevealed[data-xy="${i},${j}"]`);
                grabBomb.classList.replace('unrevealed','bomb');
                btile.isRevealed = true;
            }
            
        }
    }
}


const startGame = () => {

    document.getElementById('dialog').style.display = 'none';
    document.getElementById('game-screen').style.display = 'grid'
    
    generateGrid();
}
