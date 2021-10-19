const ChargingStation = require("../src/chargingStation")
const Scooter = require("../src/scooter")
const ScooterApp = require("../src/scooterApp")

describe('Charging station class', () => {
    beforeAll(() => {
        charg1 = new ChargingStation('A road')
        charg2 = new ChargingStation('B road')
        scoot1 = new Scooter();

        charg1.addScooter(scoot1);
    })

    test('charging station 1 has a location', () => {
        expect(charg1.location).toBe('A road')
    })

    test('Scooter app array of charging station has a new station', () => {
        expect(ScooterApp.chargingStations).toContain(charg1, charg2)
    })

    test('charging station 1 has one scooter in its location', () => {
        expect(charg1.scootersInLocation).toContain(scoot1)
    })

    test('charging stations can only invoke addScooter with instances of Scooter', () => {
        expect(() => charg1.addScooter('dummy scooter')).toThrowError('Can only add instances of scooter')
    })
})