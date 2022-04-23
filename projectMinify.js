class Area {
    
    areaArray

    constructor(dimenssions) {        
        this.dimenssions = dimenssions;
        this.size = this.dimenssions - 1;

        this.createArray();
    }

    createArray() {
        this.areaArray = new Array(this.dimenssions);

        for(let i = 0; i < this.dimenssions; i++){
            this.areaArray[i] = new Array(this.dimenssions);

            for(let j = 0; j < this.dimenssions; j++){
                this.areaArray[i][j] = new Map();
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
        this.areaArray[person.currentPosition.y][person.currentPosition.x].delete(person.id);
    }

    placePerson(person, x, y){
        if(person.infection) {
            this.getPersonByRadius(person);
        }
        this.areaArray[y][x].set(person.id, person);
    }

    getPersonByRadius(person){
        let x, d, yDiff, threshold, radiusSq, radius;

        radius = person.infection.maxInfectRadius + 1;
        radiusSq = (radius * radius) / 4;
        
        for(let y = 0; y < this.dimenssions; y++) {
            yDiff = y - person.currentPosition.y;
            threshold = radiusSq - (yDiff * yDiff);

            for(x = 0; x < this.dimenssions; x++) {
                d = x - person.currentPosition.x;

                if (((d * d) < threshold)) {
                    let distance = ~~Math.sqrt(((x - person.currentPosition.x) ** 2) + ((y - person.currentPosition.y) ** 2));
                    for(let anotherPerson of this.areaArray[y][x].values()){
                        anotherPerson.infect(person, 1 / distance);
                    }
                }
            }
        }
    }

    getAreaArray() {
        return this.areaArray;
    }
}


const MAX_TICKS_PER_DIRECTION = 10;
const MAX_MOVMENT_INTERVAL = 10;
const MAX_HEALTH_POINTS = 100;

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
        // const infectFormulaResult = (1 + (distance * person.infection.transmissionRate)) * (this.dynamicRate + this.age) * Math.random();
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

class Virus {
    constructor(name, transmissionRate, deathRate, infectRadius) {
        this.name = name;
        this.transmissionRate = 1 - transmissionRate;
        this.deathRate = deathRate;
        this.maxInfectRadius = infectRadius
    }    
}

const MAX_AGE = 100;

function createPerson(id, infection) {
        return  new Person(
            `${id}`,
            Math.floor(Math.random() * MAX_AGE),
            Math.random(),
            Math.random(),
            Math.random(),
            infection
        );
    }          

const CANVAS_SIZE = 500;

let tlv = new Area(100);

let corona = new Virus("Corona" , 0.9, 0.2, 1);

const pepole = [];

let manyak = createPerson(0, corona);
manyak.jumpToArea(tlv);
pepole.push(manyak);

for(let i = 0; i < 100; i++) {
    const person = createPerson(i + 1);
    person.jumpToArea(tlv);
    pepole.push(person);
}

function setup() {
    createCanvas(CANVAS_SIZE, CANVAS_SIZE);
    stroke(0)
    frameRate(120);
    noStroke();
    fill(0, 0, 0);
  } 
  
  function draw() {
    background(100);
    scale(5);

    for(let k = 0; k < pepole.length; k++) {
        pepole[k].iteration();
        
        if(pepole[k].infection) {
            push();
            
            fill(255, 0, 0);

            ellipse(
                pepole[k].currentPosition.x,
                pepole[k].currentPosition.y, 
                1, 
                1
            );

            pop();
        }
        else {
            ellipse(
                pepole[k].currentPosition.x,
                pepole[k].currentPosition.y, 
                1, 
                1
            );
        }
    }
    
  }