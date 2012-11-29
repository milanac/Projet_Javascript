var ZonesView = function(zones) {
    var _this = this;
    View.call(this, {
      model: zones || new ZoneModel()
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
        canvasContext.moveTo(zone.startX, zone.startY);
        canvasContext.lineTo(zone.stopX, zone.stopY);
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
    canvasContext.moveTo(this.model.finalCheckpoint.startX, this.model.finalCheckpoint.startY);
    canvasContext.lineTo(this.model.finalCheckpoint.stopX, this.model.finalCheckpoint.stopY);
    canvasContext.lineWidth = 6;

    // set line color
    canvasContext.strokeStyle = '#fff';
    canvasContext.stroke();
    canvasContext.closePath();
    canvasContext.restore();
  }
}