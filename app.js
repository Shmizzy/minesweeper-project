const button = document.querySelector('#start-button');
const gameGrid = document.getElementById('game-grid');

let gridArray = [];
const adjLocations = [
    {adjX: -1, adjY: -1}, {adjX: -1, adjY: 0}, {adjX: -1, adjY: 1},
    {adjX: 0, adjY: -1},{adjX: 0, adjY: 1},
    {adjX: 1, adjY: -1}, {adjX: 1, adjY: 0}, {adjX: 1, adjY: 1},
]





//    ------------------FUNCTIONS----------------

button.addEventListener('click', ()=> startGame());


const startGame = () => {

    document.getElementById('dialog').style.display = 'none';
    
    generateGrid();
}

const endGame = () =>{

    const gameDiv = document.getElementById('game-screen');
    const endDialog = document.getElementById('end-dialog');
    const restartButton = document.getElementById('restart-button');

    endDialog.style.display = 'grid';
    gameDiv.style.display = 'none';

    restartButton.addEventListener('click', ()=>{
        endDialog.style.display = 'none';
        gameGrid.innerHTML = '';
        gridArray = [];
        startGame();
    });

}


const generateGrid = () => {

      document.getElementById('game-screen').style.display = 'grid'

    for(let i = 0; i < 10; i++){
        gridArray[i] = []
        for(let j = 0; j < 10; j++){
            const tile = document.createElement('div');
            tile.classList.add(`unrevealed`);
            tile.dataset.xy = `${i},${j}`;
            
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
            const bombCount = checkAdjacentTiles(x,y);
            if(bombCount !== 0){
                grabTile.innerHTML = bombCount;
            }else {
                for(let adj of adjLocations){
                    const newX = x + adj.adjX;
                    const newY = y + adj.adjY;
            
                    if(newX >= 0 && newX < 10 && newY >= 0 && newY < 10){
                        reveal(newX,newY);
                    }
                }
            }
        }else{
            grabTile.classList.replace('unrevealed','bomb');
            gridArray[x][y].isRevealed = true;
            revealAllBombs();
        }
    }
    
}

const checkAdjacentTiles = (x,y) => {


    adjBombCount = 0;
    

    for(let adj of adjLocations){
        const newX = x + adj.adjX;
        const newY = y + adj.adjY;

        if(newX >= 0 && newX < 10 && newY >= 0 && newY < 10){
            if(gridArray[newX][newY].isBomb)adjBombCount++;
        }
    }

    return adjBombCount;

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
    endGame();
}




