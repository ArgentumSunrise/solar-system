function Planet(planet) {
    this.name = planet[0];
    this.radius = (univ / (15 * realUniv)) * (planet[1] / 6378);
    this.orbitDiameter = planet[2] * (univ / realUniv); // Converting between AU and px
    this.orbitRadius = this.orbitDiameter / 2
    this.year = planet[3];
    this.circ = (Math.pow(this.orbitRadius, 2) * Math.PI);
    this.orbitalPeriod = this.year / rate
    this.angle = (360 * (this.circ / this.orbitalPeriod) / this.circ) / refreshRate
    this.curAngle = 0
    this.img = planet[4];
    this.ypos = ((univ / 2 + this.orbitRadius) - this.radius / 2);
    this.xpos = (univ / 2 - this.radius / 2);
}