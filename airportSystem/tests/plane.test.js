const Plane = require('../plane')
const Passenger = require ('../passenger')
const CrewMember = require('../crewMember')

describe('crew member tests', () => {

    beforeAll(()=>{              
        passenger1 = new Passenger('Alfonso', 'YY1223', '25A');
        passenger1.addBag(10);

        crew1 = new CrewMember('Mark', 'Captain', 15)
        plane1 = new Plane('boeing');
        plane1.board(passenger1)
        plane1.boardCrew(crew1)        
    })

    test('plane member has type', ()=> {
        expect(plane1.type).toEqual('boeing')
    })

    test('error for no type', () => {
        expect(() => new Plane ()).toThrowError('missing type')
    })

    test('crew member has no wings property', ()=> {
        expect(plane1.wings).toEqual(undefined)
    })

    test('plane passenger name is Alfonso', () => {
        expect(plane1.passengers[0].name).toBe('Alfonso')
    })

    test('plane crew member staff ID is 15', () => {
        expect(plane1.crewMembers[0].staffNumber).toBe(15)
    })



})