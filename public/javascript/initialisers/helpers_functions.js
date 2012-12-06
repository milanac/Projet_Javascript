var imageModule = function (self, src, x, y) {
    return function () {
        self.image = new Image();
        self.image.src = src;
        self.x =x;
        self.y = y;
    }
}

var getCarById = function (id) {
    if(myCarModel.id == id){
        return myCarModel;
    }else{
        return hisCarModel;
    }
}

var GetImageData = function(modelImage){
    clearCanvas();
    canvasContext.drawImage(modelImage.image, modelImage.x,modelImage.y);
    returned = canvasContext.getImageData(modelImage.x, modelImage.y, modelImage.image.width, modelImage.image.height);
    clearCanvas();
    return returned;
}