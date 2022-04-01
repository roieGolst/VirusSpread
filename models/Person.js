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
            ticksCounter: undefined
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

        // if(!this.direction.ticksCounter) {
        //     const newPosition = this.currentPosition.area.movePerson(this);
        //     this.currentPosition = newPosition;

        //     this.direction.ticksCounter = MAX_TICKS_PER_DIRECTION * this.lonelyRate
            
        // }

        this.movementInterval = MAX_MOVMENT_INTERVAL * this.lonelyRate;
    }
}

module.exports = Person;