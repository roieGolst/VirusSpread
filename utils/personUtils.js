const Person = require("../models/Person");

const MAX_AGE = 100;

module.exports = {

    createPerson(infection) {
        return  new Person(
            Math.floor(Math.random() * MAX_AGE),
            Math.random(),
            Math.random(),
            infection
        );
    }   
};