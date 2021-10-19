const Scooter = require("../src/scooter")

describe('Scooter class', () => {
    beforeAll(() => {
        scoot1 = new Scooter();
        scoot2 = new Scooter();
    })

    test('scoot1 has an id of 1, a battery of 100, is charged, is not locked, is not under maintenance, has a distance travelled of 0', () =>{
        expect(scoot1).toEqual({
            battery: 100,
            distanceTravelled: 0,
            id: 1,
            isLocked: true,
            isUnderMaintenance: false,
            isCharged: true,
            isInUse: false
        })
    })

    test('scoot2 has an id of 2', () =>{
        expect(scoot2.id).toBe(2)
    })
})