const menuOverlay = document.getElementById('menu-overlay');
const controlsOverlay = document.getElementById('controls-overlay');
const difficultyOverlay = document.getElementById('difficulty-overlay');
const gameUI = document.getElementById('game-ui'); 

document.getElementById('player-vs-player-btn').addEventListener('click', () => {
    menuOverlay.style.display = 'none'; 
    gameUI.style.display = 'block'; 
    
    game.init('PvP'); 
});

document.getElementById('player-vs-computer-btn').addEventListener('click', () => {
    menuOverlay.style.display = 'none'; 
    difficultyOverlay.style.display = 'flex'; 
});

document.getElementById('about-btn').addEventListener('click', () => {
    menuOverlay.style.display = 'none'; 
    controlsOverlay.style.display = 'flex'; 
});

document.getElementById('controls-back-btn').addEventListener('click', () => {
    controlsOverlay.style.display = 'none';
    menuOverlay.style.display = 'flex'; 
});

document.getElementById('difficulty-back-btn').addEventListener('click', () => {
    difficultyOverlay.style.display = 'none';
    menuOverlay.style.display = 'flex'; 
});

document.querySelectorAll('.difficulty-button').forEach(button => {
    button.addEventListener('click', (event) => {
        const difficulty = event.target.dataset.difficulty;
        difficultyOverlay.style.display = 'none'; 
        gameUI.style.display = 'block'; 
        game.init('PvC', difficulty); 
    });
});

