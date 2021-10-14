const Passenger = require('./passenger')

describe('Passenger tests', () => {
    beforeAll(() => { 
        pass1 = new Passenger('Alfonso', 'yb11111', '24A');
        pass2 = new Passenger('Daniel', 'aa098123', '25B')
        pass1.addBag('large suitcase')
    })
    
    test('passenger has name', () => {
        expect(pass1.name).toBe('Alfonso');
    })

    test('passenger has a passport property', () => {
        expect(pass2).toHaveProperty('passportNumber')
    })

    test('passenger can add a bag', () => {
        expect(pass1).toEqual(expect.objectContaining(
            {
                "bags" : ["large suitcase"],
                "name":"Alfonso",
                "passportNumber" : "yb11111",
                "seatNumber" : "24A",
                
            }));
    })

    test('Passenger has no name error', () => {
        expect(() => new Passenger(undefined,'passport', 'seat')).toThrowError('missing name')
    })

    test('Passenger has no name passport', () => {
        expect(() => new Passenger('alfonso', undefined, 'seat')).toThrowError('missing passport')
    })

    test('Passenger has no name seat', () => {
        expect(() => new Passenger('alfonso','passport', undefined)).toThrowError('missing seat')
    })

})