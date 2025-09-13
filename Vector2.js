// Vector2.js
function Vector2(x = 0, y = 0) {
    this.x = x;
    this.y = y;
}

Vector2.prototype.copy = function () {
    return new Vector2(this.x, this.y);
};

Vector2.prototype.add = function (v) {
    return new Vector2(this.x + v.x, this.y + v.y);
};

Vector2.prototype.addTo = function (v) {
    this.x += v.x;
    this.y += v.y;
};

Vector2.prototype.subtract = function (v) {
    return new Vector2(this.x - v.x, this.y - v.y);
};

Vector2.prototype.mult = function (s) {
    return new Vector2(this.x * s, this.y * s);
};

Vector2.prototype.dot = function (v) {
    return this.x * v.x + this.y * v.y;
};

Vector2.prototype.length = function () {
    return Math.sqrt(this.x * this.x + this.y * this.y);
};

Vector2.prototype.normalize = function () {
    const len = this.length();
    if (len === 0) return new Vector2(0, 0);
    return new Vector2(this.x / len, this.y / len);
};
