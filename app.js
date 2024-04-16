const startButton = document.querySelector('#start-button');
const scoresElement = document.getElementById('scores');
const dialogElement = document.getElementById('dialog');
const gameElement = document.getElementById('game-screen');
const gridElement = document.querySelector('.game-grid');

let score = 0;
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
    const grabLastTile = document.querySelector(`.unrevealed[data-xy="9,9"]`);
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
            score += 50;
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
            scoresList.push(score);
            score = 0;
            function compareNumbers(a, b) {
                return b - a;
              }
            const newScoresElement = document.createElement('div');
            newScoresElement.style.color = 'black';
            newScoresElement.style.textAlign = 'center';
            console.log(scoresList);
            for(let i = 0; i < scoresList.length; i++){   
                newScoresElement.innerHTML =`${i+1}. ${scoresList[i]}` ;
                scoresElement.appendChild(newScoresElement);
            }

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

    let timesRestarted = 0;
    const grabMainArray = totalGamesStarted[0];
    const restartButton = document.createElement('button');
    restartButton.innerHTML = 'Play Again!'
    restartButton.classList.add("restart-button");
    restartButton.addEventListener('click' ,() => {
        totalGamesStarted.pop();
        gameElement.removeChild(restartButton);
        for(let i = 0; i < 10; i++){
            for(let j = 0; j < 10; j++){
                grabMainArray[i][j].isRevealed = false;
                grabTile = document.querySelector(`.revealed[data-xy="${i},${j}"]`)
                if(grabTile || grabMainArray[i][j].isBomb){
                    if(grabMainArray[i][j].isBomb){
                        grabTile = document.querySelector(`.bomb[data-xy="${i},${j}"]`)
                        grabTile.classList.replace('bomb','unrevealed');
                        grabTile.innerHTML = '';
                    }
                    grabTile.classList.replace('revealed','unrevealed');
                    grabTile.innerHTML = '';
                }
                
                
            }
        }
        generateGrid();
        timesRestarted++;
    })
    
    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++){
            grabMainArray[i][j].isRevealed = true;
            grabTile = document.querySelector(`.unrevealed[data-xy="${i},${j}"]`)
            gameElement.appendChild(restartButton);

            if(grabTile){
                if(grabMainArray[i][j].isBomb){
                    grabTile.classList.replace('unrevealed','bomb')
                }
                grabTile.classList.replace('unrevealed','revealed')
            }
        }
    }
}


