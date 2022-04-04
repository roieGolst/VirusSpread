const uuid = require("uuid");
const MAX_TICKS_PER_DIRECTION = 10;
const MAX_MOVMENT_INTERVAL = 10;

class Person {
    constructor(age, dynamicRate, issues, infection) { 
        this.id = uuid.v1();
        this.age = age;
        this.dynamicRate = dynamicRate;
        this.healthIssues = issues;
        this.movementInterval = 0;
        this.infection = infection;
        this.direction = {
            x: undefined,
            y: undefined,
            ticksCounter: 0
        };

        this.currentPosition = {
            x: undefined,
            y: undefined,
            area: undefined
        };
        // console.log(this);
    }

    jumpToArea(area) {
        if(this.currentPosition.area) {
            this.currentPosition.area.removePerson(this);
        }

        this.currentPosition = area.addPerson(this);
    }
    
    move() {
       if(this.movementInterval--) {
        //    console.log(`id: ${this.id}, Skip movment interval: ${this.movementInterval}`);
            return;
       }

       if(!this.direction.ticksCounter--) {
           this.direction.x = this.#randomDirection();
           this.direction.y = this.#randomDirection();
           
           this.direction.ticksCounter = MAX_TICKS_PER_DIRECTION * this.dynamicRate;

        //    console.log("new direction");
        //    console.log(`id: ${this.id}, d.x: ${this.direction.x}, d.y: ${this.direction.y}`);
       }

       this.currentPosition.area.removePerson(this);

       this.currentPosition.x += this.direction.x;
       this.currentPosition.y += this.direction.y;

        if(this.currentPosition.x < 0 || this.currentPosition.x > this.currentPosition.area.size) {
            this.direction.x *= -1;
            this.currentPosition.x += this.direction.x;
            
            // console.log(`id: ${this.id}, x out of range ${this.currentPosition.x}`);
        }

        if(this.currentPosition.y < 0 || this.currentPosition.y > this.currentPosition.area.size) {
            this.direction.y *= -1;
            this.currentPosition.y += this.direction.y;

            // console.log(`id: ${this.id}, y out of range ${this.currentPosition.y}`);

        }

        this.movementInterval = MAX_MOVMENT_INTERVAL * this.dynamicRate;
        
        this.currentPosition.area.placePerson(
            this,
            this.currentPosition.x,
            this.currentPosition.y
        );
    }

    #randomDirection() {
        const random = Math.random();
            
        if(random < 0.33) {
            return -1;
        }
        else if(random <0.63) {
            return 0;
        }

        return 1;
    }

    infect(virus) {
        // Formula
        const formulaResult = Math.random();
        
        if(formulaResult > 0.97) {
            this.infection = virus;
        }
    }

}

module.exports = Person;