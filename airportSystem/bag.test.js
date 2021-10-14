const Bag = require('./bag')

describe('Bag tests', () => {
    beforeAll(() => { 
        bag1 = new Bag(20);
        bag2 = new Bag(21);
    })
    
    test('bag has weight', () => {
        expect(bag1.weight).toBe(20);
    })

    test('bag is over limit', () =>{
        expect(bag2.isOverLimit()).toBeTruthy();
    })

    test('bag is over limit', () =>{
        expect(bag1.isOverLimit()).not.toBeTruthy();
    })

    test('bag has no weight', () => {
        expect(() => new Bag()).toThrowError('bag must have weight')
    })
})

