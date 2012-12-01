var canvas = document.createElement("canvas"),
    canvasContext = canvas.getContext("2d"),
    middleX,
    middleY;
resizeCanvas();
var carModel = new CarModel(),
    mapModel = new MapModel(),
    zonesModel = new ZonesModel(canvas.width / 2, canvas.width / 2),
    zonesView = new ZonesView(zonesModel),
    carView = new CarView(carModel),
    carController = new CarController(carView, carModel),
    mapView = new MapView(mapModel),
    playAnimation = true;


function resizeCanvas() {
    canvas.width = document.width - 20;
    canvas.height = document.height - 20;
    middleX = canvas.width / 2;
    middleY = canvas.height / 2;

}

function clearCanvas() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    canvasContext.beginPath();
}

function updateStage() {
    clearCanvas();
    mapView.render();
    zonesModel.passOnMyZones(carModel);
    carModel.update();
    zonesView.render();
    carView.render();

    if(playAnimation) {
        setTimeout(updateStage, 25);
    }
}

window.onresize = resizeCanvas;
window.onload = function() {
    resizeCanvas();
    document.body.appendChild(canvas);
    updateStage();
}