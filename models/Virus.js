class Virus {
    constructor(name, transmissionRate, deathRate, infectRadius) {
        this.name = name;
        this.transmissionRate = transmissionRate;
        this.deathRate = deathRate;
        this.maxInfectRadius = infectRadius
    }    
}

module.exports = Virus;