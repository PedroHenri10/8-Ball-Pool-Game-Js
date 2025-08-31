function Game(){

}

Game.prototype.init = function(){
    this.gameWorld = new GameWorld();
}

Game.prototype.start = function(){
    PoolGame.init();

    PoolGame.mainLoop();

}

Game.prototype.mainLoop = function(){
    Canvas.clear();
    PoolGame.gameWorld.update();
    PoolGame.gameworld.draw();
    Mouse.reset();

    requestAnimationFrame(PoolGame.mainLoop);
}

let PoolGame = new Game();