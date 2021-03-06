const Person =  require("./models/Person");
const Area = require("./models/Area");
const Virus = require("./models/Virus");
const personUtils = require("./utils/personUtils");

let tlv = new Area(10);

let coronaAlpha = new Virus("Corona" , 0.7, 0.2, 6, {r: 120, g: 45, b: 78});
let coronaOmicron = new Virus("Corona" , 0.7, 0.2, 6, {r: 15, g: 45, b: 180});

const pepole = [];

let manyak = personUtils.createPerson(0, coronaAlpha);
manyak.jumpToArea(tlv);
pepole.push(manyak);

let manyak2 = personUtils.createPerson(0, coronaOmicron);
manyak.jumpToArea(tlv);
pepole.push(manyak2);

for(let i = 0; i < 4; i++) {
    const person = personUtils.createPerson(i + 1);
    person.jumpToArea(tlv);
    pepole.push(person);
}

setInterval(() => {
    for(let k = 0; k < pepole.length; k++) {
        pepole[k].iteration();
    }
    console.table(tlv.getAreaArray());
}, 50);