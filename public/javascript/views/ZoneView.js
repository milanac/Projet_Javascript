var ZonesView = function(zones) {
    var _this = this;
    View.call(this, {
      model: zones || new ZonesModel()
    });
  }
ZonesView.prototype = new View();
ZonesView.prototype.render = function() {
  var length = this.model.zones.length,
    zone = null;
  if(!this.model.passAllCheckpoint()) {
    for(var i = 0; i < length; i++) {
      zone = this.model.zones[i];
      if(!zone.passed) {
        canvasContext.save();
        canvasContext.beginPath();
        canvasContext.moveTo(zone.startX + middleX, zone.startY + middleY);
        canvasContext.lineTo(zone.stopX + middleX, zone.stopY+ middleY);
        canvasContext.lineWidth = 5;

        // set line color
        canvasContext.strokeStyle = '#ff0000';
        canvasContext.stroke();
        canvasContext.closePath();
        canvasContext.restore();
      }
    }
  } else {
    canvasContext.save();
    canvasContext.beginPath();
    canvasContext.moveTo(this.model.finalCheckpoint.startX + middleX, this.model.finalCheckpoint.startY + middleY);
    canvasContext.lineTo(this.model.finalCheckpoint.stopX + middleX, this.model.finalCheckpoint.stopY+ middleY);
    canvasContext.lineWidth = 6;

    // set line color
    canvasContext.strokeStyle = '#fff';
    canvasContext.stroke();
    canvasContext.closePath();
    canvasContext.restore();
  }
}