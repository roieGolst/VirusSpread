class Area {
    
    #areaArray

    constructor(dimenssions, popularity, maxTicks) {        
        this.dimenssions = dimenssions;
        this.popularity = popularity;
        this.maxTicks = maxTicks;

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

    placeAperson(person, x, y) {
        this.#areaArray[y][x].set(person.id, person);
        console.table(this.#areaArray)
        return {x: x,y: y};
    }

    movePerson(place, personKye, x, y) {
        let memory = this.#areaArray[y][x].get(personKye.id);
        this.#areaArray[y][x].delete(personKye.id);
        this.placeAperson(
            memory,
            Math.floor(Math.random() * place.dimenssions),
            Math.floor(Math.random() * place.dimenssions)
            );
    }
}

module.exports = Area;