const fs = require("fs");
const faker = require("faker");

/**
 * Creates demo data for the example app and saves them to a file ("data.json").
 *  -> 20 plants
 *  -> 50 machines for each plant --> 1000 in total
 *
 *  To serve these, use json-server --watch db.json
 */
function createData() {
    const plants = [];
    const machines = [];

    for (let i = 1; i < 21; i++) {
        const plant = {
            id: i,
            city: faker.address.city(),
            zipCode: faker.address.zipCode(),
            street: faker.address.streetName(),
            country: faker.address.country(),
            description: faker.lorem.words()
        };
        plants.push(plant);

        for (let j = 1; j < 51; j++) {
            const machine = {
                id: machines.length + 1,
                price: faker.commerce.price(),
                lastFailure: faker.date.past(),
                ip: faker.internet.ip(),
                mac: faker.internet.mac(),
                plantId: i
            };
            machines.push(machine);
        }
    }
    fs.writeFileSync("data.json", JSON.stringify({plants, machines}), {encoding: "utf8"});
}

createData();
