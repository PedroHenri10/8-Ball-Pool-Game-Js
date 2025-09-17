const BALL_ORIGIN = new Vector2(25, 25);
const BALL_DIAMETER = 30;
const BALL_RADIUS = BALL_DIAMETER / 2;

function Ball(position, color) {
    this.position = position.copy ? position.copy() : new Vector2(position.x, position.y);
    this.velocity = new Vector2();
    this.moving = false;
    this.color = color;
    this.sprite = getBallSpriteByColor(color);
}

Ball.prototype.update = function (delta) {
    this.position.addTo(this.velocity.mult(delta));
    this.velocity = this.velocity.mult(0.984);
    if (this.velocity.length() < 5) {
        this.velocity = new Vector2();
        this.moving = false;
    } else {
        this.moving = true;
    }
};

Ball.prototype.collideWithBall = function (ball) {
    const n = this.position.subtract(ball.position);
    const dist = n.length();
    if (dist === 0 || dist > BALL_DIAMETER) return;

    const mtd = n.mult((BALL_DIAMETER - dist) / dist);

    this.position = this.position.add(mtd.mult(0.5));
    ball.position = ball.position.subtract(mtd.mult(0.5));

    const un = n.mult(1 / dist);
    const ut = new Vector2(-un.y, un.x);

    const v1n = un.dot(this.velocity);
    const v1t = ut.dot(this.velocity);
    const v2n = un.dot(ball.velocity);
    const v2t = ut.dot(ball.velocity);

    this.velocity = un.mult(v2n).add(ut.mult(v1t));
    ball.velocity = un.mult(v1n).add(ut.mult(v2t));

    this.moving = true;
    ball.moving = true;
};

Ball.prototype.collideWithTable = function (table) {
    if (!this.moving) return;

    let collided = false;
    if (this.position.y <= table.TopY + BALL_RADIUS) {
        this.velocity = new Vector2(this.velocity.x, -this.velocity.y);
        collided = true;
    }
    if (this.position.x >= table.RightX - BALL_RADIUS) {
        this.velocity = new Vector2(-this.velocity.x, this.velocity.y);
        collided = true;
    }
    if (this.position.y >= table.BottomY - BALL_RADIUS) {
        this.velocity = new Vector2(this.velocity.x, -this.velocity.y);
        collided = true;
    }
    if (this.position.x <= table.LeftX + BALL_RADIUS) {
        this.velocity = new Vector2(-this.velocity.x, this.velocity.y);
        collided = true;
    }
    if (collided) this.velocity = this.velocity.mult(0.98);
};

Ball.prototype.draw = function () {
    if (this.sprite) {
        Canvas.drawImage(this.sprite, this.position, BALL_ORIGIN);
    } else {
        const ctx = Canvas.getContext();
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, BALL_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = this.color || 'white';
        ctx.fill();
        ctx.closePath();
    }
};

Ball.prototype.shoot = function (power, rotation) {
    this.velocity = new Vector2(power * Math.cos(rotation), power * Math.sin(rotation));
    this.moving = true;
};

Ball.prototype.collideWith = function (obj) {
    if (obj instanceof Ball) this.collideWithBall(obj);
    else this.collideWithTable(obj);
};