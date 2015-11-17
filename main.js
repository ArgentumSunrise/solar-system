var univ = $('#universe').width();
var univContent = "<img src='imgs/sun.png' class='body' id='sun'>"
var realUniv = 1.75; // Distances calculated in AU
var data = [["mercury", 2440, .387, 87.969, "imgs/mercury.png"],
["venus", 6052, .730, 224.701, "imgs/venus.png"],
["earth", 6378, 1, 365.256, "imgs/earth.png"],
["mars", 3397, 1.524, 686.971, "imgs/mars.png"]];
var planets = [];
var rate = 2; // days / sec
var refreshRate = 100

$(document).ready(function () {
    for (var i = 0; i < data.length; i++) {
        planet = new Planet(data[i]);
        drawOrbit(planet);
        drawPlanet(planet);
        planets[i] = planet;
        $('#universe').html(univContent);
    }
    setInterval(function () {
        for (var i = 0; i < planets.length; i++) {
            movePlanet(planets[i])
        }
    }, 100);

})

function drawOrbit(planet) {
    margins = "top:calc(50% - " + planet.orbitRadius + "px);left:calc(50% - " + planet.orbitRadius + "px);"
    univContent += "<div class='orbit' id='" + planet.name + "-orbit' style='border-radius:" + planet.orbitRadius + "px;height:" + planet.orbitDiameter + "px;width:" + planet.orbitDiameter + "px;" + margins + "'></div>";
}

function drawPlanet(planet) {
    curPlanet = "<img class='body planet' id='" + planet.name + "' src='" + planet.img + "' style='height:" + planet.radius + "px;width:" + planet.radius + "px;top:" + ((univ / 2 + planet.orbitRadius) - planet.radius / 2) + "px;left:" + (univ / 2 - planet.radius / 2) + "px;'>"
    curPlanet += "<h1 class='planet-name' id='" + planet.name + "-name' style='px;top:" + ((univ / 2 + planet.orbitRadius - 20) - planet.radius / 2) + "px;left:" + (univ / 2 - planet.radius / 2 + 30) + "px;'>" + capitalizeFirstLetter(planet.name) + "</h1>"
    univContent += curPlanet
}

function movePlanet(planet) {
    planet.curAngle += planet.angle
    ydist = ((univ / 2) - planet.radius / 2) + (Math.cos(planet.curAngle) * planet.orbitRadius);
    xdist = ((univ / 2) - planet.radius / 2) + (Math.sin(planet.curAngle) * planet.orbitRadius);
    $("#" + planet.name).animate({
        top: ydist,
        left: xdist
    }, refreshRate)

    $("#" + planet.name + "-name").animate({
        top: ydist - 20,
        left: xdist + 30
    }, refreshRate)
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}