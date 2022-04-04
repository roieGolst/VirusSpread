const Person = require("../models/Person");

const MAX_AGE = 100;

module.exports = {

    createPerson(infection) {
        let dynamicRate = Math.random();

        return  new Person(
            Math.floor(Math.random() * MAX_AGE),
            parseFloat(dynamicRate.toFixed(1)),
            [],
            infection
        );
    }   
};