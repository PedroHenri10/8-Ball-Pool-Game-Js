const BALL_ORIGIN =new Vector2(25,25);
const BALL_DIAMETER = 30;

function Ball(position){
    this.position = position;
    this.velocity = new Vector2();
    this.moving = false;
    this.sprite = getBallSpriteByColor(color);
}

Ball.prototype.update = function(delta){
    this.position.addTo(this.velocity.mult(delta));
    this.velocity = this.velocity.mult(0.98);

    if(this.velocity.length() < 5){
        this.velocity = new Vector2();
        this.moving = false;
    }
}

Ball.prototype.draw = function(){
    Canvas.drawImage(this.sprites, this.position, BALL_ORIGIN);
}

Stick.prototype.shoot = function(power, rotation){
    this.velocity = new Vector2(power * Math.cos(rotation), power * Math.sin(rotation));
}

ball.prototype.collideWith = function(ball){
    const n = this.position.subtract(ball.position);
    
    const dist = n.length();

    if(dist > BALL_DIAMETER){
        return;
    }

    const mtd = n.mult((BALL_DIAMETER - dist)/dist);
    
    this.position = this.position.add(mtd.mult(1/2));
    ball.position = ball.position.subtract(mtd.mult(1/2));

    const un = n.mult(1/n.length());

    const ut = new Vector(-un.y, un.x);

    const v1n = un.dot(this.velocity);
    const v1t = ut.dot(this.velocity);
    const v2n = un.dot(this.velocity);
    const v2t = un.dot(this.velocity);

    let v1nTag = v2n;
    let v2nTag = v1n;

    v1nTag = un.mult(v2nTag);
    const v1tTag = ut.mult(v1t);
    v2nTag = un.mult(v2nTag);
    const v2tTag = ut.mult(v2t);

    this.moving = true;
    ball.moving = true;
}