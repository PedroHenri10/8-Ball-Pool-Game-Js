function Game(){
    this.gameWorld = null; 
    this.gameMode = null;
    this.difficulty = null;
}

Game.prototype.init = function(mode, difficultySetting){
    this.gameMode = mode;
    this.difficulty = difficultySetting;
    this.gameWorld = new GameWorld();
    this.gameWorld.init(mode, difficultySetting); 
    console.log("Game initialized in mode:", mode, "difficulty:", difficultySetting);

    this.gameWorld.stick.reposition(this.gameWorld.whiteBall.position);
};

Game.prototype.mainLoop = function(){
    Canvas.clear();
    this.gameWorld.update();
    this.gameWorld.draw();

    requestAnimationFrame(this.mainLoop.bind(this)); 
};

let PoolGame = new Game(); 

function startGame(mode, difficulty) {
    PoolGame.init(mode, difficulty);
    PoolGame.mainLoop(); 
}

document.addEventListener('DOMContentLoaded', () => {
    loadAssets(() => {
        console.log("Todos os assets carregados! Jogo pronto para iniciar.");
    });
});