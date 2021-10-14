const Airport = require('../airport')
const Plane = require('../plane')
const Passenger = require ('../passenger')
const Bag = require('../bag')

describe('airport tests', () => {

    beforeAll(()=>{              
        airport1 = new Airport('Gatwick');    
        plane1 = new Plane('Boeing');
        passenger1 = new Passenger('Alfonso', 'YB111', '11A');
        plane2 = new Plane('Heli');
        passenger2 = new Passenger('Mark', 'AA1212', '1C');
        bag1 = new Bag(10);
        
        passenger2.addBag(bag1);

        plane1.board(passenger1);
        plane2.board(passenger2);

        airport1.takingOff(plane1);
        airport1.comingIn(plane2);
        
    })

    test('airport has name', ()=> {
        expect(airport1.name).toEqual('Gatwick')
    })

    test('error for no name', () => {
        expect(() => new Airport ()).toThrowError('missing name')
    })

    test('crew member has no wizard property', ()=> {
        expect(airport1.wizard).toEqual(undefined)
    })

    test('airport has an array of planes objects taking off', () => {
        expect(airport1.planesTakingOff).toEqual(expect.objectContaining(
            [{
                "passengers": [passenger1],
                "type":"Boeing",              
            }]));
    })

    test('airport has an array of planes objects coming in', () => {
        expect(airport1.planesArriving).toEqual(expect.objectContaining(
            [{
                "passengers": [passenger2],
                "type":"Heli",              
            }]));
    })

    test('passenger2 has a bag value of 10', () => {
        expect(airport1.planesArriving[0].passengers[0].bags[0].weight).toEqual(10)
    })

})