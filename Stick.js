function Stick(){
    this.position = new Vector2(400, 400);
    this.origin = new Vector2(500,10);
}

Stick.protype.update = function(){
    this.position = Mouse.position;

}

Stick.prototype.draw = function(){
    Canvas.drawImage(sprites.stick, this.position, this.origin);
}