function Canvas2D() {
    this._canvas = document.getElementById('screen');
    this._canvasContext = this._canvas.getContext('2d');

    this.nativeDimensions = {
        width: 1500,
        height: 826
    };

    this.scale = 1;
    this.offset = { x: 0, y: 0 };

    this.resizeCanvas();

    window.addEventListener('resize', () => this.resizeCanvas());
}

Canvas2D.prototype.resizeCanvas = function () {
    this._canvas.width = window.innerWidth;
    this._canvas.height = window.innerHeight;

    const scaleX = this._canvas.width / this.nativeDimensions.width;
    const scaleY = this._canvas.height / this.nativeDimensions.height;
    
    this.scale = Math.min(scaleX, scaleY);

    const scaledWidth = this.nativeDimensions.width * this.scale;
    const scaledHeight = this.nativeDimensions.height * this.scale;
    
    this.offset.x = (this._canvas.width - scaledWidth) / 2;
    this.offset.y = (this._canvas.height - scaledHeight) / 2;
};

Canvas2D.prototype.beginDrawing = function () {
    if (!this._canvasContext) return;
    
    this._canvasContext.clearRect(0, 0, this._canvas.width, this._canvas.height);

    this._canvasContext.save();

    this._canvasContext.translate(this.offset.x, this.offset.y);
    this._canvasContext.scale(this.scale, this.scale);
};

Canvas2D.prototype.endDrawing = function () {
    if (!this._canvasContext) return;

    this._canvasContext.restore();
};


Canvas2D.prototype.drawImage = function (image, position, origin, rotation = 0) {
    if (!this._canvasContext || !image) return;

    const finalPos = position instanceof Vector2 ? position : new Vector2(position.x, position.y);
    const finalOrigin = origin instanceof Vector2 ? origin : (origin ? new Vector2(origin.x, origin.y) : new Vector2(0, 0));

    this._canvasContext.save();
    this._canvasContext.translate(finalPos.x, finalPos.y);
    this._canvasContext.rotate(rotation);
    this._canvasContext.drawImage(image, -finalOrigin.x, -finalOrigin.y);
    this._canvasContext.restore();
};

Canvas2D.prototype.getContext = function () {
    return this._canvasContext;
};

let Canvas = new Canvas2D();
