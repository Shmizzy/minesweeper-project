

const button = document.querySelector('#start-button');

button.addEventListener('click', ()=> startGame());



const startGame = () => {
    document.getElementById('dialog').style.display = 'none';

    document.getElementById('game-screen').style.display = 'grid'
    
    generateGrid();
}


const generateGrid = () => {
    
}