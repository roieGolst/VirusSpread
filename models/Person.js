class Person {

    #uuid

    constructor(age, social, issues, place) {
        this.#uuid = require("uuid");
        this.id = this.#uuid.v1();
        this.age = age;
        this.social = social;
        this.healthIssues = issues;
        this.place = place;
    }
}

module.exports = Person;