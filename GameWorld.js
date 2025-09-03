const DELTA = 1/100;

function GameWorld(){

    this.balls = [
    new Ball(new Vector2(1056,433),Color.red),//3
    new Ball(new Vector2(1090,374),Color.red),//4
    new Ball(new Vector2(1126,393),Color.red),//8
    new Ball(new Vector2(1126,472),Color.red),//10;
    new Ball(new Vector2(1162,335),Color.red),//11
    new Ball(new Vector2(1162,374),Color.red),//12
    new Ball(new Vector2(1162,452),Color.red),
    new Ball(new Vector2(1022,413),Color.yellow),//1
    new Ball(new Vector2(1056,393),Color.yellow),//2
    new Ball(new Vector2(1090,452),Color.yellow),//6
    new Ball(new Vector2(1126,354),Color.yellow),//7
    new Ball(new Vector2(1126,433),Color.yellow),//9
    new Ball(new Vector2(1162,413),Color.yellow),//13
    new Ball(new Vector2(1162,491),Color.yellow)
    ].map(params => new Ball(params[0], params[1]));

    this.whiteBall = this.balls[this.balls.length -1];
    this.stick = new Stick(new Vector2(413, 413), this.whiteBall.shoot.bind(this.whiteBall));

    this.table ={
        TopY: 57,
        RightX: 1443,
        BottomY: 768,
        LeftX: 57
    }
}

GameWorld.prototype.handleCollisions = function(){
    for(let i = 0; i < this.balls.length ; i++){
        this.balls[i].collideWith(this.table);
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
