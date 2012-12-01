var ZonesModel = function(middleX, middleY) {
        var _this = this;
        Model.call(this, {
            zones: [{
                startX: 247,
                startY: 92,
                stopX: 373,
                stopY: 62,
                passed: false
            },
            {
                startX: 47,
                startY: -204,
                stopX: 104,
                stopY: -278,
                passed: false
            },
            {
                startX: -366,
                startY: 167,
                stopX: -272,
                stopY: 100,
                passed: false
            },
            {
                startX: 19,
                startY: -61,
                stopX: 84,
                stopY: -141,
                passed: false
            }],

            finalCheckpoint: {
                startX: 247,
                startY: 92,
                stopX: 373,
                stopY: 62,
                passed: false
            }
        })
    }
ZonesModel.prototype =  new Model();
ZonesModel.prototype.passOnZone = function(zone, pointX, pointY) {
    var m, p, result, xMin, xMax, YMin, YMax, zoneStartX, zoneStartY, zoneStopX, zoneStopY;
    zoneStartX = zone.startX + middleX;
    zoneStartY = zone.startY + middleY;
    zoneStopX = zone.stopX + middleX;
    zoneStopY = zone.stopY + middleY;
    m = (zoneStopY - zoneStartY) / (zoneStopX - zoneStartX);
    p = zoneStartY - (m * zoneStartX);
    result = pointX * m + p;
    xMin = Math.min(zoneStartX, zoneStopX);
    xMax = Math.max(zoneStartX, zoneStopX);
    yMin = Math.min(zoneStartY, zoneStopY);
    yMax=  Math.max(zoneStartY, zoneStopY);
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