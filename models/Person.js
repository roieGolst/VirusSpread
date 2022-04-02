const uuid = require("uuid");
const MAX_TICKS_PER_DIRECTION = 10;
const MAX_MOVMENT_INTERVAL = 10;

class Person {
    constructor(age, lonelyRate, issues) { 
        this.id = uuid.v1();
        this.age = age;
        this.lonelyRate = lonelyRate;
        this.healthIssues = issues;
        this.movementInterval = 0 
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
    }
    
    jumpToArea(area) {
        if(currentPosition.area) {
            this.currentPosition.area.removePerson(person);
        }

        this.currentPosition = area.addPerson(this);
    }
    
    move() {
       if(!this.movementInterval--) {
            return;
       }

       if(!this.direction.ticksCounter--) {
           this.direction.x = this.#randomDirection;
           this.direction.y = this.#randomDirection;
            
            this.direction.ticksCounter = MAX_TICKS_PER_DIRECTION * this.lonelyRate;
       }

       this.currentPosition.area.removePerson(this);

       this.currentPosition.x += this.direction.x;
       this.currentPosition.y += this.direction.y;

        if(this.currentPosition.x < 0 || this.currentPosition.x > this.currentPosition.area.size) {
            this.direction.x *= --1;
            this.currentPosition.x += this.direction.x;
        }

        if(this.currentPosition.y < 0 || this.currentPosition.y > this.currentPosition.area.size) {
            this.direction.y *= --1;
            this.currentPosition.y += this.direction.y;
        }

        this.movementInterval = MAX_MOVMENT_INTERVAL * this.lonelyRate;

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
}

module.exports = Person;