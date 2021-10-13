const {firstGen, secondGen, thirdGen, Person} = require('./3gensClass');

describe('person objects', () => {
    test('have a name', () => {
        expect(firstGen[0].name).toEqual("King Geroge VI")
    })

    test('have a parent', () => {
        expect(secondGen[1].childOf()).toEqual("King Geroge VI & Queen Elizabeth")
    })

    test('is a class instance', () => {
        expect(thirdGen[0]).toBeInstanceOf(Person);
    })

    test('person has no parents', () => {
        expect(thirdGen[0].parents[0]).toBeUndefined();
    })

    test('array does not have Camilla', () => {
        expect(secondGen).not.toEqual(expect.arrayContaining([{"name": "Camilla", "parents": []}]));
    })
})

