class Area {
    
    #areaArray

    constructor(dimenssions) {        
        this.dimenssions = dimenssions;
        this.size = this.dimenssions - 1;

        this.#createArray();
    }

    #createArray() {
        this.#areaArray = new Array(this.dimenssions);

        for(let i = 0; i < this.dimenssions; i++){
            this.#areaArray[i] = new Array(this.dimenssions);

            for(let j = 0; j < this.dimenssions; j++){
                this.#areaArray[i][j] = new Map();
            }
        }
    }

    addPerson(person) {
        let x = Math.floor(Math.random() * this.dimenssions);
        let y = Math.floor(Math.random() * this.dimenssions)

        this.placePerson(person, x, y);

        return {x, y, area: this};
    }

    removePerson(person){
        this.#areaArray[person.currentPosition.y][person.currentPosition.x].delete(person.id);
    }

    placePerson(person, x, y){
        if(person.infection) {
            console.log(`infecting ${person.id}, x: ${x}, y: ${y}`);
            for(let anotherPerson of this.#areaArray[y][x].values()) {
                anotherPerson.infect(person, 1);
                throw new Error("infect in same place");
            }

            // this.getPersonByRadius(person);
        }
        this.#areaArray[y][x].set(person.id, person);
    }

    // getPersonByRadius(person){
    //     let x, y, d, yDiff, threshold, radiusSq, radius;
    //     radius = person.infection.maxInfectRadius;
    //     radiusSq = (radius * radius) / 4;
    //     for(y = 0; y < this.dimenssions; y++) {
    //         yDiff = y - person.currentPosition.y;
    //         threshold = radiusSq - (yDiff * yDiff);
    //         for(x = 0; x < this.dimenssions; x++) {
    //             d = x - person.currentPosition.x;

    //             if (((d * d) < threshold)) {
    //                 for(let anotherPerson of this.#areaArray[y][x].values()){
    //                     anotherPerson.infect(person);
    //                     throw new Error(`person: ${person.id} is infect by radius`);
    //                 }
    //             }
    //         }
    //     }
    // }

    getAreaArray() {
        return this.#areaArray;
    }
}

module.exports = Area;