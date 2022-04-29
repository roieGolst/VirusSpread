class Virus {
    constructor(name, transmissionRate, deathRate, infectRadius, color) {
        this.name = name;
        this.transmissionRate = 1 - transmissionRate;
        this.deathRate = deathRate;
        this.maxInfectRadius = infectRadius;
        this.color = color;
    }    
}

module.exports = Virus;