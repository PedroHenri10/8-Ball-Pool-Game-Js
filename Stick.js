function Stick(){
    this.position = {x:0,y:400};
}

Stick.protype.update = function(){
    this.position.x++;

}

Stick.prototype.draw = function(){
    Canvas.drawImage(sprites.stick, this.position);
}