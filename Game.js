// 8-Ball-Pool-Game-Js-main/js/game.js

var sprites = {};
let assetsStillLoading = 0;

function assetsLoadingLoop(callback){
    if(assetsStillLoading > 0){
        requestAnimationFrame(assetsLoadingLoop.bind(this, callback)); 
    } else {
        callback();
    }
}

function loadAssets(callback){
    function loadSprite(fileName, name){
        assetsStillLoading++;

        let spriteImage = new Image();
        spriteImage.src = "./assets/sprites/" + fileName;

        spriteImage.onload = function(){
            sprites[name] = spriteImage;
            assetsStillLoading--;
        }

        spriteImage.onerror = function(){
            console.error("Falha ao carregar sprite: " + spriteImage.src);
            assetsStillLoading--;
        }

        return spriteImage;
    }

    loadSprite('spr_background5.png', 'background');
    loadSprite('spr_stick.png', 'stick');
    loadSprite('spr_whiteBall.png', 'whiteBall');
    loadSprite('spr_redBall2.png', 'redBall');
    loadSprite('spr_yellowBall2.png', 'yellowBall');
    loadSprite('spr_blackBall2.png', 'blackBall');

    assetsLoadingLoop(callback);
}

function getBallSpriteByColor(color){
    switch(color){
        case COLOR.RED:
            return sprites.redBall;
        case COLOR.YELLOW:
            return sprites.yellowBall;
        case COLOR.BLACK:
            return sprites.blackBall;
        case COLOR.WHITE:
            return sprites.whiteBall;
        default:
            console.warn("Cor de bola desconhecida:", color);
            return null;
    }
}

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

    // Certifique-se de que a bola branca existe antes de tentar posicionar o taco
    if (this.gameWorld.whiteBall) {
        this.gameWorld.stick.reposition(this.gameWorld.whiteBall.position);
    }
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
    // 1. Inicialize o Canvas primeiro, para garantir que o elemento 'screen' foi encontrado
    Canvas.init(); 

    // 2. Depois carregue os assets
    loadAssets(() => {
        console.log("Todos os assets carregados! Jogo pronto para iniciar.");
        // Opcional: mostrar o menu apenas quando tudo estiver carregado
        document.getElementById('menu-overlay').style.display = 'flex'; 
    });
});