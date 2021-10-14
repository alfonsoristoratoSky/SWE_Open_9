const {firstGen, secondGen, thirdGen, Person} = require('./3gensClass');

describe('person objects', () => {
    test('have a name', () => {
        expect(firstGen[0].name).toEqual("King Geroge VI")
    })

    test('childOf return unknown', () => {
        expect(firstGen[0].childOf()).toEqual("unknown")
    })

    test('have a parent', () => {
        expect(secondGen[1].childOf()).toEqual("King Geroge VI & Queen Elizabeth")
    })

    test('is a class instance', () => {
        expect(thirdGen[0]).toBeInstanceOf(Person)
    })

    test('person has no parents', () => {
        expect(thirdGen[0].parents[0]).toBeUndefined();
    })

    test('array does not contain Camilla', () => {
        expect(secondGen).not.toEqual(expect.arrayContaining([{"name": "Camilla", "parents": []}]));
    })

    test('object has property name', () => {
        expect(secondGen[0]).toHaveProperty('name')
    })

    //thought of via TDD
    test('has a title', () => {
        expect(secondGen[0].title()).toBe('Prince')
    })

    test('does not have a title', () => {
        expect(thirdGen[0].title()).toBe('no title')
    })

    test('double name does not have a title', () => {
        expect(new Person('Mary Ann').title()).toBe('no title')
    })
})

