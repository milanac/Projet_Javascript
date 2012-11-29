var ZonesModel = function() {
        var _this = this;
        Model.call(this, {
            zones: [{
                startX: 920,
                startY: 423,
                stopX: 1046,
                stopY: 393,
                passed: false
            },
            {
                startX: 720,
                startY: 127,
                stopX: 777,
                stopY: 53,
                passed: false
            },
            {
                startX: 307,
                startY: 498,
                stopX: 401,
                stopY: 431,
                passed: false
            },
            {
                startX: 692,
                startY: 270,
                stopX: 757,
                stopY: 190,
                passed: false
            }],

            finalCheckpoint: {
                startX: 920,
                startY: 423,
                stopX: 1046,
                stopY: 393,
                passed: false
            }
        })
    }
ZonesModel.prototype =  new Model();
ZonesModel.prototype.passOnZone = function(zone, pointX, pointY) {
    var m, p, result, xMin, xMax, YMin, YMax;
    m = (zone.stopY - zone.startY) / (zone.stopX - zone.startX);
    p = zone.startY - (m * zone.startX);
    result = pointX * m + p;
    xMin = Math.min(zone.startX, zone.stopX);
    xMax = Math.max(zone.startX, zone.stopX);
    yMin = Math.min(zone.startY, zone.stopY);
    yMax=  Math.max(zone.stopY, zone.stopY);
    if(((Math.floor(result) <= Math.floor(pointY) + 10 && Math.floor(result) >= Math.floor(pointY) - 10 ) || (Math.ceil(result) <= Math.ceil(pointY) + 10 && Math.ceil(result) >= Math.ceil(pointY) - 10)) && ((pointX >= xMin && pointX <= xMax) || (pointY >= yMin && pointY <= yMax))) {
        return true;
    }
    return false;
}
ZonesModel.prototype.passOnMyZones = function(car) {
    var passing = false,
        zonesLength = this.zones.length,
        i = 0,
        passed;

    while(i < zonesLength && !passing) {
        if(!this.zones[i].passed) {
            passed = this.passOnZone(this.zones[i], car.x, car.y);
            this.zones[i].passed = passed;
            passing = passing || passed;
        }
        i++;
    }
    this.doALap(car);
}

ZonesModel.prototype.passAllCheckpoint = function () {
    var passCheckpoint = true;
    var length = this.zones.length,
        zone = null;
    for(var i = 0; i < length; i++) {
        zone = this.zones[i];
        passCheckpoint = passCheckpoint && zone.passed;
    }
    return passCheckpoint;
}

ZonesModel.prototype.doALap = function(car) {
    var passAlap = false;
    if(this.passAllCheckpoint()){
        if(this.passOnZone(this.finalCheckpoint, car.x, car.y)){
            pubsub.publish("car/finish_lap", {
                    car: car
                });
            this.newLap();
        }
    }else{
        return false;
    }
}

ZonesModel.prototype.newLap = function() {
    var length = this.zones.length,
        zone = null;
    for(var i = 0; i < length; i++) {
        zone = this.zones[i];
        zone.passed = false;
    }
}