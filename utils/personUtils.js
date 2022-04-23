const Person = require("../models/Person");

const MAX_AGE = 100;

module.exports = {

    createPerson(id, infection) {
        return  new Person(
            `${id}`,
            Math.floor(Math.random() * MAX_AGE),
            Math.random(),
            Math.random(),
            Math.random(),
            infection
        );
    }   
};