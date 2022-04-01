class Area {
    
    #areaArray

    constructor(dimenssions, popularity) {        
        this.dimenssions = dimenssions;
        this.popularity = popularity;

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
        this.#areaArray[y][x].set(person.id, person);
    }


    movePerson(person) {
        this.removePerson(person);
        
        
    }
}

module.exports = Area;