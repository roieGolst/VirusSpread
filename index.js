const Person =  require("./models/Person");
const Area = require("./models/Area");
const Virus = require("./models/Virus");
const Utils = require("./utils");

let tlv = new Area(10);

let corona = new Virus("Corona" , 0.2, 0.1);

const pepole = [];

for(let i = 0; i < 10; i++) {
    const person = Utils.personUtils.createPerson();
    person.jumpToArea(tlv);
    Utils.virusUtils.getInfected(person, corona);
    pepole.push(person);
}
// console.log(roie);
// for(let i = 0; i < 10; i++){
//     lsa.placeAperson(
//         roie, 
//         Math.floor(Math.random() * lsa.dimenssions), 
//         Math.floor(Math.random() * lsa.dimenssions)
//     );
// }
// for(let i = 0; i < 30; i++){
//     for(let j = 0; j < pepole.length; j++) {
//         pepole[j].move();
//     }
//     console.table(tlv.getAreaArray());
// }