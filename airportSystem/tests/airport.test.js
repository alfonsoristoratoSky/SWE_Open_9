const Airport = require('../airport')
const Plane = require('../plane')
const Passenger = require ('../passenger')
const Bag = require('../bag')
const CrewMember = require('../crewMember')

describe('airport tests', () => {

    beforeAll(()=>{              
        airport1 = new Airport('Gatwick');    
        plane1 = new Plane('Boeing');
        passenger1 = new Passenger('Alfonso', 'YB111', '11A');
        plane2 = new Plane('Heli');
        passenger2 = new Passenger('Mark', 'AA1212', '1C');
        bag1 = new Bag(10);
        crew1 = new CrewMember('John', 'cabin crew', 10)
        
        passenger2.addBag(bag1);

        plane1.board(passenger1);
        plane2.board(passenger2);
        plane2.boardCrew(crew1);

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
                "crewMembers" : []           
            }]));
    })

    test('airport has an array of planes coming in, which also has other arrays in ', () => {
        expect(airport1.planesArriving).toEqual(expect.objectContaining(
            [{
                "crewMembers" : [crew1],
                "passengers": [passenger2],
                "type":"Heli",     
                      
            }]));
    })

    test('passenger2 has a bag value of 10', () => {
        expect(airport1.planesArriving[0].passengers[0].bags[0].weight).toEqual(10)
    })

    //static tests
    test('Airport has an arry of airports automatically created', () => {
        expect(Airport.airports).toEqual(expect.arrayContaining(
            
                Airport.airports
                      
             ));
    })

    test('airports array has a 1st airport with name Gatwick', () => {
        expect(Airport.airports[0].name).toBe('Gatwick')
    })

    test('gatwick has an id of 1', () => {
        expect(airport1.id).toBe(1)
    })

    test('idcounter has an array of lenght 1', () => {
        expect(Airport.idCounter.length).toBe(1)
    })
    

    test('new airport has an id of 2', () => {
        expect(new Airport('Luton').id).toBe(2)
    })

    test('new airport has an id of 3', () => {
        expect(new Airport('third airport').id).toBe(3)
    })

    test('final new airport has an id of 4', () => {
        expect(new Airport('third airport').id).toBe(4)
    })

    test('idcounter has an array of lenght 4 by now', () => {
        expect(Airport.idCounter.length).toBe(4)
    })

})