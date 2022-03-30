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
        console.log(`x =  ${x} y = ${y} dimenssions = ${this.dimenssions}`);

        if(x < 0 || x >= this.dimenssions) {
            this.movePerson(person);
            return;
        }

        if(y < 0 || y >= this.dimenssions) {
            this.movePerson(person);
            return;
        }
        this.#areaArray[y][x].set(person.id, person);
        console.table(this.#areaArray);

        person.saveLocation({x, y, area: this});
        // console.log(person);
    }

    movePerson(person) {
        this.#areaArray[person.currentPosition.y][person.currentPosition.x].delete(person.id);

        if(Math.floor(Math.random() * 2)) {
            if(Math.floor(Math.random() * 2)) {
                this.placeAperson(
                    person,
                    person.currentPosition.x,
                    person.currentPosition.y+1
                );
            }
            else {
                this.placeAperson(
                    person,
                    person.currentPosition.x,
                    person.currentPosition.y-1
                );
            }
        }
        else {
            if(Math.floor(Math.random() * 2)) {
                this.placeAperson(
                    person,
                    person.currentPosition.x+1,
                    person.currentPosition.y
                );
            }
            else {
                this.placeAperson(
                    person,
                    person.currentPosition.x-1,
                    person.currentPosition.y
                );
            }
        }
    }
}

module.exports = Area;