function Game() {
    this.gameWorld = null;
    this.gameMode = null;
    this.difficulty = null;
    this._running = false;
}

Game.prototype.init = function (mode, difficultySetting) {
    this.gameMode = mode || 'PvP';
    this.difficulty = difficultySetting || 'medium';
    this.gameWorld = new GameWorld();
    this.gameWorld.init(this.gameMode, this.difficulty);
    console.log("Game initialized in mode:", this.gameMode, "difficulty:", this.difficulty);

    if (this.gameWorld.whiteBall) {
        this.gameWorld.stick.reposition(this.gameWorld.whiteBall.position);
    }
};

Game.prototype.mainLoop = function () {
    if (!this.gameWorld) return;

    Canvas.beginDrawing();

    this.gameWorld.update();
    this.gameWorld.draw();
    
    Canvas.endDrawing();
    
    this.updateUI();

    requestAnimationFrame(this.mainLoop.bind(this));
};

Game.prototype.updateUI = function () {
    const scoreEl = document.getElementById('score');
    const curEl = document.getElementById('current-player');
    if (scoreEl) scoreEl.textContent = `Player 1: ${this.gameWorld.player1Score} | ${this.gameWorld.player2Score} :Player 2`;
    if (curEl) curEl.textContent = `Current Player: ${this.gameWorld.currentPlayer === 1 ? 'Player 1' : 'Player 2'}`;
};

let PoolGame = new Game();

function startGame(mode, difficulty) {
    PoolGame.init(mode, difficulty);
    PoolGame.mainLoop();
}

document.addEventListener('DOMContentLoaded', () => { 

    loadAssets(() => {
        console.log("Todos os assets carregados! Jogo pronto para iniciar.");
        const menu = document.getElementById('menu-overlay');
        if (menu) menu.style.display = 'flex';
    });
});