const uuid = require("uuid");
class Person {
    constructor(age, social, issues, place) {
        this.x; 
        this.y; 
        this.id = uuid.v1()
        this.age = age;
        this.social = social;
        this.healthIssues = issues;
        this.place = place;
    }

    saveLocation(poss) {
        this.x = poss.x;
        this.y = poss.y;    
    }
}

module.exports = Person;