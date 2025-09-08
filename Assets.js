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