const uuid = require("uuid");
class Person {
    constructor(age, social, issues) { 
        this.id = uuid.v1()
        this.age = age;
        this.social = social;
        this.healthIssues = issues;
        this.currentPosition = {
            x: undefined,
            y: undefined,
            area: undefined
        };
    }

    move() {
        const newPosition = this.currentPosition.area.movePerson(this);
        this.currentPosition = newPosition;
    }

    jumpToArea(area) {
        if(currentPosition.area) {
            this.currentPosition.area.removePerson(person);
        }

        this.currentPosition = area.addPerson(this);
    }

    updatePosition(position) {
        this.currentPosition = position;
    }
}

module.exports = Person;