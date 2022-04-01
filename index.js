const Person =  require("./models/Person");
const Area = require("./models/Area");
const Virus = require("./models/Virus");

let lsa = new Area(7, 1, 6);
let tl = new Area(7, 1, 6);

const pepole = [
    new Person(20, 1, [])
];

// console.log(roie);
// for(let i = 0; i < 10; i++){
//     lsa.placeAperson(
//         roie, 
//         Math.floor(Math.random() * lsa.dimenssions), 
//         Math.floor(Math.random() * lsa.dimenssions)
//     );
// }

roie.jumpToArea(pepole);
roie.jumpToArea(tl);


for(let i = 0; i < pepole.length; i++) {
    pepole[i].move();
}