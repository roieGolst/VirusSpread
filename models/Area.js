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
                this.#areaArray[i][j] = new Array();
            }
        }
    }

    placeAperson(person, x, y) {
        this.#areaArray[x][y].push(person); 
        console.table(this.#areaArray);
    }

}

module.exports = Area;