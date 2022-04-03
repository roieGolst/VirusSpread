const Person = require("../models/Person");

module.exports = {

    createPerson() {
        let dynamicRate = Math.random();

        return new Person(
            Math.floor(Math.random() * 100),
            parseFloat(dynamicRate.toFixed(1)),
            [],
            Math.random()
        );
    }   
};