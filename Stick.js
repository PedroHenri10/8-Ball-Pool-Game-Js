const STICK_ORIGIN = new Vector2(970, 11);
const STICK_SHOT_ORIGIN = new Vector2(950, 11);
const MAX_POWER = 7500;

function Stick(position, onShoot) {
    this.position = position.copy ? position.copy() : new Vector2(position.x, position.y);
    this.rotation = 0;
    this.origin = STICK_ORIGIN.copy();
    this.power = 0;
    this.onShoot = onShoot;
    this.shot = false;
}

Stick.prototype.update = function () {
    if (typeof Mouse !== 'undefined' && Mouse.left && Mouse.left.down) {
        this.increasePower();
    } else if (this.power > 0) {
        this.shoot();
    }
    this.updateRotation();
};

Stick.prototype.draw = function () {
    if (sprites.stick) {
        Canvas.drawImage(sprites.stick, this.position, this.origin, this.rotation);
    } else {
        
        const ctx = Canvas.getContext();
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = '#6b3';
        ctx.fillRect(-5, -5, 60, 10);
        ctx.restore();
    }
};

Stick.prototype.updateRotation = function () {
    if (typeof Mouse === 'undefined' || !Mouse.position) return;
    const opposite = Mouse.position.y - this.position.y;
    const adjacent = Mouse.position.x - this.position.x;
    this.rotation = Math.atan2(opposite, adjacent);
};

Stick.prototype.increasePower = function () {
    if (this.power > MAX_POWER) return;
    this.power += 120;
    this.origin.x += 5;
};

Stick.prototype.shoot = function () {
    if (typeof this.onShoot === 'function') {
        this.onShoot(this.power, this.rotation);
    }
    this.power = 0;
    this.origin = STICK_SHOT_ORIGIN.copy();
    this.shot = true;
};

Stick.prototype.reposition = function (position) {
    this.position = position.copy ? position.copy() : new Vector2(position.x, position.y);
    this.origin = STICK_ORIGIN.copy();
    this.shot = false;
};
