const BALL_ORIGIN = new Vector2(25, 25);
const BALL_DIAMETER = 30;
const BALL_RADIUS = BALL_DIAMETER / 2;

function Ball(position, color) {
    this.position = position;
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
    }
}

Ball.prototype.collideWithBall = function (ball) {
    const n = this.position.subtract(ball.position);
    const dist = n.length();

    if (dist > BALL_DIAMETER) {
        return;
    }

    const mtd = n.mult((BALL_DIAMETER - dist) / dist);

    this.position = this.position.add(mtd.mult(0.5));
    ball.position = ball.position.subtract(mtd.mult(0.5));

    const un = n.mult(1 / n.length());
    const ut = new Vector2(-un.y, un.x);

    const v1n = un.dot(this.velocity);
    const v1t = ut.dot(this.velocity);
    const v2n = un.dot(ball.velocity);
    const v2t = ut.dot(ball.velocity);

    let v1nTag = v2n;
    let v2nTag = v1n;

    this.velocity = un.mult(v1nTag).add(ut.mult(v1t));
    ball.velocity = un.mult(v2nTag).add(ut.mult(v2t));

    this.moving = true;
    ball.moving = true;
}

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

    if (collided) {
        this.velocity = this.velocity.mult(0.98);
    }
}

Ball.prototype.draw = function () {
    Canvas.drawImage(this.sprite, this.position, BALL_ORIGIN);
}

Ball.prototype.shoot = function (power, rotation) {
    this.velocity = new Vector2(power * Math.cos(rotation), power * Math.sin(rotation));
    this.moving = true;
}

Ball.prototype.collideWith = function (object) {
    if (object instanceof Ball) {
        this.collideWithBall(object);
    } else {
        this.collideWithTable(object);
    }
}
