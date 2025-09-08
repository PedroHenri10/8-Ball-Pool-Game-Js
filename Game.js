function Game(){

}

Game.prototype.init = function(){
    this.GameWorld = new GameWorld();
}

PoolGame.start = function(mode, difficultySetting) {
    PoolGame.gameMode = mode;
    PoolGame.difficulty = difficultySetting;
    PoolGame.init();
    PoolGame.mainLoop(); 
};

Game.prototype.mainLoop = function(){
    Canvas.clear();
    PoolGame.GameWorld.update();
    PoolGame.Gameworld.draw();
    Mouse.reset();

    requestAnimationFrame(PoolGame.mainLoop);
}

let PoolGame = new Game();