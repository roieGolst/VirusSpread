const Person =  require("./models/Person");
const Area = require("./models/Area");
const Virus = require("./models/Virus");

let lsa = new Area(19, 1, 6);

let roie = new Person(20, 1, []);


for(let i = 0; i < 10; i++){
    lsa.placeAperson(
        roie, 
        Math.floor(Math.random() * lsa.dimenssions), 
        Math.floor(Math.random() * lsa.dimenssions)
    );
}