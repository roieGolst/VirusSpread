class Virus {
    constructor(name, spreadMethods, transmissionRate, deathRate) {
        this.name = name;
        this.spreadMethods = spreadMethods;
        this.transmissionRate = transmissionRate;
        this.deathRate = deathRate;
    }
}

module.exports = Virus;