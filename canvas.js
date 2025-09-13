// 8-Ball-Pool-Game-Js-main/js/canvas.js

function Canvas2D(){
    this._canvas = null; // Inicialize como null
    this._canvasContext = null;
}

Canvas2D.prototype.init = function() { // Adicione um método init
    this._canvas = document.getElementById('screen');
    if (!this._canvas) {
        console.error("Canvas element with ID 'screen' not found!");
        return;
    }
    this._canvasContext = this._canvas.getContext('2d');

    // Usaremos as dimensões da sua imagem de fundo (spr_background5.png), que é 1500x826
    this._canvas.width = 1500; 
    this._canvas.height = 826; 

    // Opcional, mas boa prática para garantir que o estilo CSS não sobrescreva a resolução de desenho
    this._canvas.style.width = this._canvas.width + 'px';
    this._canvas.style.height = this._canvas.height + 'px';

    console.log("Canvas initialized with dimensions:", this._canvas.width, "x", this._canvas.height);
};

Canvas2D.prototype.clear = function(){
    if (this._canvasContext) {
        this._canvasContext.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }
}

Canvas2D.prototype.drawImage = function(image, position, origin, rotation = 0){
    if (!this._canvasContext || !image) {
        // Esta linha pode ser útil para depuração se as imagens não aparecerem
        // console.warn("Cannot draw image: context or image is missing.", image); 
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

let Canvas = new Canvas2D(); // Apenas instancie, o init será chamado depois