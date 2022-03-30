const Person =  require("./models/Person");
const Area = require("./models/Area");
const Virus = require("./models/Virus");

let lsa = new Area(7, 1, 6);

let roie = new Person(20, 1, [], lsa);
let yoni = new Person(30, 0.8, []);
let yakir =  new Person(5, 0.4, []);

// console.log(roie);
// for(let i = 0; i < 10; i++){
//     lsa.placeAperson(
//         roie, 
//         Math.floor(Math.random() * lsa.dimenssions), 
//         Math.floor(Math.random() * lsa.dimenssions)
//     );
// }

lsa.placeAperson(
    roie,
    Math.floor(Math.random() * lsa.dimenssions),
    Math.floor(Math.random() * lsa.dimenssions)
)
for(let i = 0; i < 15; i++){
    lsa.movePerson(roie);
}