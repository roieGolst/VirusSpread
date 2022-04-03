module.exports = {

    getInfected(person, virus) {
        if(person.infection > 0.9) {
            person.infection = virus;

            console.log(`id: ${person.id}, is infected with: ${virus.name}`);
            return;
        }
        
        person.infection = undefined;
        return;
    }
};
