const DELTA = 1 / 100;

function GameWorld() {
    this.balls = [
        new Ball(new Vector2(1056, 433), COLOR.RED),
        new Ball(new Vector2(1090, 374), COLOR.RED),
        new Ball(new Vector2(1126, 472), COLOR.RED),
        new Ball(new Vector2(1162, 335), COLOR.RED),
        new Ball(new Vector2(1162, 374), COLOR.RED),
        new Ball(new Vector2(1162, 452), COLOR.RED),
        new Ball(new Vector2(1022, 413), COLOR.YELLOW),
        new Ball(new Vector2(1056, 393), COLOR.YELLOW),
        new Ball(new Vector2(1090, 452), COLOR.YELLOW),
        new Ball(new Vector2(1126, 354), COLOR.YELLOW),
        new Ball(new Vector2(1126, 433), COLOR.YELLOW),
        new Ball(new Vector2(1162, 413), COLOR.YELLOW),
        new Ball(new Vector2(1162, 491), COLOR.YELLOW),
        new Ball(new Vector2(1126, 393), COLOR.BLACK),
        new Ball(new Vector2(413, 413), COLOR.WHITE)
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
}

GameWorld.prototype.init = function (mode, difficulty) {
    this.gameMode = mode || 'PvP';
    this.difficulty = difficulty || 'medium';
};

GameWorld.prototype.handleCollisions = function () {
    for (let i = 0; i < this.balls.length; i++) {
        this.balls[i].collideWith(this.table);
        for (let j = i + 1; j < this.balls.length; j++) {
            const a = this.balls[i];
            const b = this.balls[j];
            a.collideWith(b);
        }
    }
};

GameWorld.prototype.update = function () {
    this.handleCollisions();
    if (this.stick) this.stick.update();

    this.ballsAreMoving = false;
    for (let i = 0; i < this.balls.length; i++) {
        this.balls[i].update(DELTA);
        if (this.balls[i].moving) this.ballsAreMoving = true;
    }

    if (!this.ballsAreMoving && this.stick && this.stick.shot) {
        this.stick.reposition(this.whiteBall.position);
    }
};

GameWorld.prototype.draw = function () {
    if (sprites.background) Canvas.drawImage(sprites.background, new Vector2(0, 0));
    else {
        const ctx = Canvas.getContext();
        if (ctx) {
            ctx.fillStyle = "#006400";
            ctx.fillRect(0, 0, 1500, 826);
        }
    }

    for (let i = 0; i < this.balls.length; i++) this.balls[i].draw();

    if (this.stick) this.stick.draw();
};
