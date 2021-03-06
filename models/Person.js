const MAX_TICKS_PER_DIRECTION = 10;
const MAX_MOVMENT_INTERVAL = 10;
const MAX_HEALTH_POINTS = 10;

class Person {
    constructor(id, age, socialRate, dynamicRate, issues, infection) { 
        this.id = id;
        this.age = age / 100;
        this.socialRate = socialRate;
        this.dynamicRate = dynamicRate;
        this.healthIssues = issues;
        this.healthPoints = MAX_HEALTH_POINTS;
        this.movementInterval = 0;
        this.deathFormulaResult = 0;
        this.direction = {
            x: undefined,
            y: undefined,
            ticksCounter: 0
        };

        this.#resetCurrentPosition();

        if(infection) {
            this.#infectPerson(infection);
        }
        // console.log(this);
    }

    #resetCurrentPosition() {
        this.currentPosition = {
            x: undefined,
            y: undefined,
            area: undefined
        };
    }

    jumpToArea(area) {
        if(this.currentPosition.area) {
            this.currentPosition.area.removePerson(this);
        }

        this.currentPosition = area.addPerson(this);
    }
    
    #move() {
       if(this.movementInterval--) {
        //    console.log(`id: ${this.id}, Skip movment interval: ${this.movementInterval}`);
            return;
       }

       if(!this.direction.ticksCounter--) {
           this.direction.x = this.#randomDirection();
           this.direction.y = this.#randomDirection();
           
           this.direction.ticksCounter = ~~(MAX_TICKS_PER_DIRECTION * this.dynamicRate);

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

        this.movementInterval = ~~(MAX_MOVMENT_INTERVAL * (1 - this.dynamicRate));
        
        this.currentPosition.area.placePerson(
            this,
            this.currentPosition.x,
            this.currentPosition.y
        );
    }

    iteration() {
        if(!this.currentPosition.area) {
            return;
        }

        this.#move();

        if(this.infection) {
            this.#killing();
        }
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

    infect(person, distance) {
        if(this.infection == person.infection) {
            return;
        }
        
        // Formula
        const infectFormulaResult = (distance + this.socialRate) * Math.random();
        
        if(infectFormulaResult > person.infection.transmissionRate) {
            this.#infectPerson(person.infection);
            // console.log(person, "infect" , this, "distance is" , distance);
        }
        
    }

    #infectPerson(infection){
        this.infection = infection;
        this.deathFormulaResult = (this.infection.deathRate * (this.age + this.healthIssues));
    }

    #killing() {

        this.healthPoints -= this.deathFormulaResult;

        if(this.healthPoints < 0){
            this.currentPosition.area.removePerson(this);
            this.#resetCurrentPosition();
            // console.log(this, "manyak");
            // throw new Error("is dead");
        }       
    }

}

module.exports = Person;