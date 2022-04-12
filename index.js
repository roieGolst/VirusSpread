const Person =  require("./models/Person");
const Area = require("./models/Area");
const Virus = require("./models/Virus");
const personUtils = require("./utils/personUtils");

let tlv = new Area(7);

let corona = new Virus("Corona" , 0.1, 0.9);

const pepole = [];

let manyak = personUtils.createPerson(corona);
manyak.jumpToArea(tlv);
pepole.push(manyak);

for(let i = 0; i < 4; i++) {
    const person = personUtils.createPerson();
    person.jumpToArea(tlv);
    pepole.push(person);
}

setInterval(() => {
    for(let k = 0; k < pepole.length; k++) {
        pepole[k].move();
    }
    console.table(tlv.getAreaArray());
}, 50);``