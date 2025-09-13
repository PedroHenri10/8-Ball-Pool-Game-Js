const menuOverlay = document.getElementById('menu-overlay');
const controlsOverlay = document.getElementById('controls-overlay');
const difficultyOverlay = document.getElementById('difficulty-overlay');
const gameUI = document.getElementById('game-ui');

const playerVsPlayerBtn = document.getElementById('player-vs-player-btn');
const playerVsComputerBtn = document.getElementById('player-vs-computer-btn');
const aboutBtn = document.getElementById('about-btn');

if (playerVsPlayerBtn) {
    playerVsPlayerBtn.addEventListener('click', () => {
        if (menuOverlay) menuOverlay.style.display = 'none';
        if (gameUI) gameUI.style.display = 'block';
        startGame('PvP');
    });
}

if (playerVsComputerBtn) {
    playerVsComputerBtn.addEventListener('click', () => {
        if (menuOverlay) menuOverlay.style.display = 'none';
        if (difficultyOverlay) difficultyOverlay.style.display = 'flex';
    });
}

if (aboutBtn) {
    aboutBtn.addEventListener('click', () => {
        if (menuOverlay) menuOverlay.style.display = 'none';
        if (controlsOverlay) controlsOverlay.style.display = 'flex';
    });
}

const controlsBack = document.getElementById('controls-back-btn');
if (controlsBack) controlsBack.addEventListener('click', () => {
    if (controlsOverlay) controlsOverlay.style.display = 'none';
    if (menuOverlay) menuOverlay.style.display = 'flex';
});

const diffBack = document.getElementById('difficulty-back-btn');
if (diffBack) diffBack.addEventListener('click', () => {
    if (difficultyOverlay) difficultyOverlay.style.display = 'none';
    if (menuOverlay) menuOverlay.style.display = 'flex';
});

document.querySelectorAll('.difficulty-button').forEach(button => {
    button.addEventListener('click', (event) => {
        const difficulty = event.target.dataset.difficulty;
        if (difficultyOverlay) difficultyOverlay.style.display = 'none';
        if (gameUI) gameUI.style.display = 'block';
        startGame('PvC', difficulty);
    });
});
