function Canvas2D(){
    this._canvas = document.getElementById('screen');
    if (!this._canvas) {
        console.error("Canvas element with ID 'screen' not found!");
        return;
    }
    this._canvasContext = this._canvas.getContext('2d');

    this._canvas.width = 1440; 
    this._canvas.height = 810; 
}

Canvas2D.prototype.clear = function(){
    if (this._canvasContext) {
        this._canvasContext.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }
}

Canvas2D.prototype.drawImage = function(image, position, origin, rotation = 0){
    if (!this._canvasContext || !image) {
        return;
    }

    let finalPosition = position instanceof Vector2 ? position : new Vector2(position.x, position.y);
    let finalOrigin = origin instanceof Vector2 ? origin : (origin ? new Vector2(origin.x, origin.y) : new Vector2(0,0));

    this._canvasContext.save();
    this._canvasContext.translate(finalPosition.x, finalPosition.y);
    this._canvasContext.rotate(rotation);
    this._canvasContext.drawImage(image, -finalOrigin.x, -finalOrigin.y);
    this._canvasContext.restore();
}

let Canvas = new Canvas2D();