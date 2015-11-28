var univ = $('#universe').width();
var univContent = "<img src='imgs/sun.png' class='body' id='sun'>"
var realUniv = 1.5; // Distances calculated in AU
var innerPlanets = [["mercury", 2440, .387, 87.969, "imgs/mercury.png"],
["venus", 6052, .730, 224.701, "imgs/venus.png"],
["earth", 6378, 1, 365.256, "imgs/earth.png"],
["mars", 3397, 1.524, 686.971, "imgs/mars.png"]];
var outerPlanets = [['jupiter', 69911, 5.203, 4331.936, "imgs/mars.png"],
['saturn', 58232, 9.582, 10742.179, "imgs/mars.png"],
['uranus', 25559, 19.201, 30696.114, "imgs/mars.png"],
['neptune', 24764, 30.050, 59799.712, "imgs/mars.png"]];
var planets = []
var rate = 2; // days / sec
var refreshRate = 200 / rate

$(document).ready(function () {
    loopData(innerPlanets);
    loopData(outerPlanets);
    setInterval(function () {
        for (var i = 0; i < planets.length; i++) {
            movePlanet(planets[i])
        }
    }, refreshRate);

    $('#size-up').click(function () {
        changeSize(realUniv)
        $('#size-down').removeClass('disabled');

    });
    $('#size-down').click(function () {
        if (realUniv == 1.5) {
            $('#size-down').addClass('disabled');
        } else {
            changeSize((realUniv / 2) * -1)
            $('#size-down').removeClass('disabled');
        }
    })

})

function drawOrbit(planet) {
    margins = "top:calc(50% - " + planet.orbitRadius + "px);left:calc(50% - " + planet.orbitRadius + "px);"
    univContent += "<div class='orbit' id='" + planet.name + "-orbit' style='border-radius:" + planet.orbitRadius + "px;height:" + planet.orbitDiameter + "px;width:" + planet.orbitDiameter + "px;" + margins + "'></div>";
}

function drawPlanet(planet) {
    curPlanet = "<img class='body planet' id='" + planet.name + "' src='" + planet.img + "' style='height:" + planet.radius + "px;width:" + planet.radius + "px;top:" + planet.ypos + "px;left:" + planet.xpos + "px;'>"
    curPlanet += "<h3 class='planet-name' id='" + planet.name + "-name' style='px;top:" + (planet.ypos - 20) + "px;left:" + (planet.xpos + 30) + "px;'>" + capitalizeFirstLetter(planet.name) + "</h3>"
    univContent += curPlanet
}

function movePlanet(planet) {
    size = realUniv / 1.5
    planet.curAngle += planet.angle
    var x = univ / 2
    ydist = (((planet.ypos + (Math.cos(planet.curAngle) * planet.orbitRadius) - planet.orbitRadius) - x) / size) + x
    xdist = ((planet.xpos + (Math.sin(planet.curAngle) * planet.orbitRadius) - x) / size) + x
    $("#" + planet.name).animate({
            top: ydist,
            left: xdist
        }, refreshRate)
        //    console.log(capitalizeFirstLetter(planet.name) + " xdist " + (xdist - 500) + " ydist " + (ydist - 500))

    //    console.log(capitalizeFirstLetter(planet.name) + " TOP: " + $("#" + planet.name).css('top') + " LEFT: " + $("#" + planet.name).css('left'));

    $("#" + planet.name + "-name").animate({
        top: ydist - 20,
        left: xdist + 30
    }, refreshRate)
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getData(planet, size) {
    planet = new Planet(planet)
    if (size) {
        planet.xpos = ((parseInt($('#' + planet.name).css('left')) - 500) / size)
        planet.ypos = ((parseInt($('#' + planet.name).css('top')) - 500) / size)
    }
    drawOrbit(planet);
    drawPlanet(planet);
    planets.push(planet);
    console.log(planet.name + " " + planet.xpos + " " + planet.ypos)
}

function changeSize(setting) {
    $('#universe').fadeOut(500);
    $('#zoomed').fadeOut(500);
    setTimeout(function () {
        var x = planets.length
        realUniv += setting;
        univContent = "<img src='imgs/sun.png' class='body' id='sun'>";
        if (realUniv < 6) {
            loopData(innerPlanets, size)
        };
        loopData(outerPlanets, size);
        planets = planets.slice(0, x)
        $('#universe').fadeIn(500);
        $('#zoomed').html(realUniv + 'AU').fadeIn(500);
    }, 500);
}

function loopData(arr, size) {
    for (var i = 0; i < arr.length; i++) {
        getData(arr[i], size)
    }
    $('#universe').html(univContent);
}