var imageModule = function(self, src, x, y) {
        return function() {
            self.image = new Image();
            self.image.src = src;
            self.x = x;
            self.y = y;
        }
    }

var getCarById = function(id) {
        if(myCarModel.id == id) {
            return myCarModel;
        } else {
            return hisCarModel;
        }
    }

function checkCollision(spriteA, spriteB, AposX, AposY, BposX, BposY){
  if( !(AposX+spriteA.image.width < BposX)
  && !(AposX > BposX+spriteB.image.width)
  && !(AposY+spriteA.image.height < BposY)
  && !(AposY > BposY+spriteB.image.height) ){
    return true;
  }
  return false;
}