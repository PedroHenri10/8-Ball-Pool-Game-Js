const DELTA = 1/100;

function GameWorld(){
    this.whiteBall = this.balls[this.balls.length -1];
    this.stick = new Stick(new Vector2(413, 413), this.whiteBall.shoot.bind(this.whiteBall));
}

GameWorld.prototype.handleCollisions = function(){
    for(let i = 0; i < this.balls.length ; i++){
        for(let j = i+1; j <this.balls.length ; j++){
            const firstBall = this.balls[i];
            const secondBall = this.balls[j];
            firstBall.collideWith(secondBall);
        }
    }   
}

GameWorld.prototype.update = function(){
    this.handleCollisions();
    this.stick.update();
    for(let i = 0; i < this.balls.length ; i++){
        this.Balls[i].update(DELTA);
    }

    if(!this.ballsMoving() && this.stick.shot){
        this.stick.reposition(this.whiteBall.position);
    }
}

GameWorld.prototype.draw = function(){
    Canvas.drawImage(sprites.background, {x:0, y:0});

    for(let i = 0; i < this.balls.length ; i++){
        this.Balls[i].draw(DELTA);
    }

    this.stick.draw();
    
}

GameWorld.prototype.ballsMoving = function(){
    let ballsMoving = false;

    for(let i = 0; i< this.balls.length ; i++){
        if(this.Balls[i].moving){
            ballsMoving = true;
            break;
        }
    }
}

ball.prototype.collideWith = function(ball){
    
}