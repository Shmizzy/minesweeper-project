const startButton = document.querySelector('#start-button');
const dialogElement = document.getElementById('dialog');
const gameElement = document.getElementById('game-screen');
const gridElement = document.getElementById('game-grid');

let scoresList = [];
let totalGamesStarted = [];
const adjLocations = [
    {adjX: -1, adjY: -1}, {adjX: -1, adjY: 0}, {adjX: -1, adjY: 1},
    {adjX: 0, adjY: -1},{adjX: 0, adjY: 1},
    {adjX: 1, adjY: -1}, {adjX: 1, adjY: 0}, {adjX: 1, adjY: 1},
]

startButton.addEventListener('click', () => startGame());



const startGame = () => {
    
    dialogElement.style.display = 'none';
    gameElement.style.display = 'grid';
    generateGrid();

    

}




const generateGrid = () => {
    let grid = [];
    for(let i = 0; i < 10; i++){
        grid.push([]);
        for(let j = 0; j < 10; j++){
            grid[i][j] = `${i},${j}`;
            const tile = document.createElement('div');
            tile.classList.add(`unrevealed`);
            tile.dataset.xy = `${i},${j}`;
            grid[i][j] = {
                adjacentBombs: 0,
                isRevealed: false,
                isBomb: false
            };
            gridElement.appendChild(tile);
            tile.addEventListener('click', () => reveal(i,j));
        }
    }
    
    for(let bomb = 0; bomb <= 20; bomb++){
        let randomRow = Math.floor(Math.random() * 10);
        let randomColumn = Math.floor(Math.random() * 10);
        grid[randomRow][randomColumn].isBomb = true;
    }
    totalGamesStarted.push(grid);
}
console.log(totalGamesStarted);





const reveal = (x,y) => {
    
    const grabTile = document.querySelector(`.unrevealed[data-xy="${x},${y}"]`);
    const grabMainArray = totalGamesStarted[0];
    
    if(!grabMainArray[x][y].isRevealed){
        if(grabMainArray[x][y].isBomb === false){
            grabTile.classList.replace('unrevealed','revealed');
            grabMainArray[x][y].isRevealed = true;
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
        }else {
            revealAll();
           
        }
    }
    
}


const checkAdjacentTiles = (x,y) => {

    const grabMainArray = totalGamesStarted[0];
    adjBombCount = 0;
    

    for(let adj of adjLocations){
        const newX = x + adj.adjX;
        const newY = y + adj.adjY;

        if(newX >= 0 && newX < 10 && newY >= 0 && newY < 10){
            if(grabMainArray[newX][newY].isBomb)adjBombCount++;
        }
    }

    return adjBombCount;

}

const revealAll = () => { 

    const grabMainArray = totalGamesStarted[0];
    
    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++){
            grabMainArray[i][j].isRevealed = true;
            grabTile = document.querySelector(`.unrevealed[data-xy="${i},${j}"]`)
            if(grabTile){
                if(grabMainArray[i][j].isBomb){
                    grabTile.classList.replace('unrevealed','bomb')
                }
                grabTile.classList.replace('unrevealed','revealed')
            }
        }
    }
}