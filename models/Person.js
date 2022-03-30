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

    saveLocation(poss) {
        this.currentPosition = poss;
    }
}

module.exports = Person;