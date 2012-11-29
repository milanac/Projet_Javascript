var imageModule = function (self, src, x, y) {
    return function () {
        self.image = new Image();
        self.image.src = src;
        self.x =x;
        self.y = y;
    }
}