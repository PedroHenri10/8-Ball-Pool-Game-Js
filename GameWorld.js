// 8-Ball-Pool-Game-Js-main/js/gameworld.js

const DELTA = 1/100; 

function GameWorld(){
    this.balls = [
        new Ball(new Vector2(1056,433), COLOR.RED),
        new Ball(new Vector2(1090,374), COLOR.RED),
        new Ball(new Vector2(1126,472), COLOR.RED),
        new Ball(new Vector2(1162,335), COLOR.RED),
        new Ball(new Vector2(1162,374), COLOR.RED),
        new Ball(new Vector2(1162,452), COLOR.RED),
        new Ball(new Vector2(1022,413), COLOR.YELLOW),
        new Ball(new Vector2(1056,393), COLOR.YELLOW),
        new Ball(new Vector2(1090,452), COLOR.YELLOW),
        new Ball(new Vector2(1126,354), COLOR.YELLOW),
        new Ball(new Vector2(1126,433), COLOR.YELLOW),
        new Ball(new Vector2(1162,413), COLOR.YELLOW),
        new Ball(new Vector2(1162,491), COLOR.YELLOW),
        new Ball(new Vector2(1126,393), COLOR.BLACK),
        new Ball(new Vector2(413,413), COLOR.WHITE) 
    ];
    
    this.whiteBall = this.balls[this.balls.length - 1]; 
    
    this.stick = new Stick(new Vector2(this.whiteBall.position.x, this.whiteBall.position.y), this.whiteBall.shoot.bind(this.whiteBall));

    this.table = {
        TopY: 57,
        RightX: 1443,
        BottomY: 768,
        LeftX: 57
    };
    
    this.player1Score = 0;
    this.player2Score = 0;
    this.currentPlayer = 1;
    this.gameMode = null; 
    this.difficulty = null;
    this.firstShotTaken = false;
    this.ballsAreMoving = false; 
} // Fechamento da função GameWorld

GameWorld.prototype.init = function(mode, difficulty){
    this.gameMode = mode;
    this.difficulty = difficulty;
};

GameWorld.prototype.handleCollisions = function(){
    for(let i = 0; i < this.balls.length ; i++){
        this.balls[i].collideWith(this.table); 
        for(let j = i+1; j < this.balls.length ; j++){
            const firstBall = this.balls[i];
            const secondBall = this.balls[j];
            firstBall.collideWith(secondBall); 
        }
    }   
}

GameWorld.prototype.update = function(){
    this.handleCollisions();
    this.stick.update();
    
    this.ballsAreMoving = false; 
    for(let i = 0; i < this.balls.length ; i++){
        this.balls[i].update(DELTA);
        if (this.balls[i].moving) {
            this.ballsAreMoving = true;
        }
    }

    // Se as bolas pararam e o taco já atirou, reposiciona o taco
    if(!this.ballsAreMoving && this.stick.shot){
        this.stick.reposition(this.whiteBall.position);
    }
}

GameWorld.prototype.draw = function(){
    // Desenha a imagem de fundo (a mesa) primeiro
    Canvas.drawImage(sprites.background, new Vector2(0, 0));

    // Depois desenha as bolas
    for(let i = 0; i < this.balls.length ; i++){
        this.balls[i].draw(); 
    }

    // Por fim, desenha o taco
    this.stick.draw(); 
}