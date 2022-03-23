function Person(age, social, issues) {
    this.age = age;
    this.social = social;
    this.healthIssues = issues;

}

const Protoytpe = {
    
};

Person.prototype = Protoytpe;
Person.prototype.construcator = Person;

module.exports = Person;
