const Person =  require("./models/Person");
const Area = require("./models/Area");
const Virus = require("./models/Virus");

let lsa = new Area(7, 1);
let tl = new Area(5, 1);

const pepole = [
    new Person(20, 0.2, [])
];

// console.log(roie);
// for(let i = 0; i < 10; i++){
//     lsa.placeAperson(
//         roie, 
//         Math.floor(Math.random() * lsa.dimenssions), 
//         Math.floor(Math.random() * lsa.dimenssions)
//     );
// }

pepole[0].jumpToArea(lsa);
pepole[0].jumpToArea(tl);


for(let i = 0; i < 30; i++) {
    pepole[0].move();
}