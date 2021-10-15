const CrewMember = require('../crewMember')

describe('crew member tests', () => {
    beforeAll(()=>{
        crew1 = new CrewMember('Mark', 'Captain', 1)
    })

    test('crew member has name', ()=> {
        expect(crew1.name).toEqual('Mark')
    })

    test('error for no name', () => {
        expect(() => new CrewMember(undefined, 'cabin crew', 1)).toThrowError('missing name')
    })

    test('error for no position', () => {
        expect(() => new CrewMember('Lizzie', undefined, 1)).toThrowError('missing position')
    })

    test('error for no staff number', () => {
        expect(() => new CrewMember('Daniel', 'captain')).toThrowError('missing staff number')
    })

    test('crew member has no bag property', ()=> {
        expect(crew1.bag).toEqual(undefined)
    })



})