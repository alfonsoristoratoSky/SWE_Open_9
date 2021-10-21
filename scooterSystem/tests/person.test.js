const Person = require("../src/person")

describe('Person class', () => {
    beforeAll(()=>{
        pers1 = new Person('Alfo', '1991-04-03')
    })

    test('pers1 has a name and DOB', () => {
        expect(pers1.name).toBe("Alfo")
    })

    test('DOB needs to be in YYYY-MM-DD format', () => {
        
        expect(() => new Person('Mark', 1)).toThrowError('Date of birth must be in YYYY-MM-DD format')
    })

    test('DOB needs to be in full YYYY-MM-DD format', () => {
        expect(() => new Person('Mark', '10-10')).toThrowError('Date of birth must be in YYYY-MM-DD format')
    })

    test('DOB needs to be in YYYY-MM-DD format, month 13 does not exists', () => {
        expect(() => new Person('Mark', '2000-13-13')).toThrowError('Date of birth must be in YYYY-MM-DD format')
    })

    test('DOB needs to be in YYYY-MM-DD format, necessarily as a string', () => {
        expect(() => new Person('Mark', 2000-12-25)).toThrowError('Date of birth must be in YYYY-MM-DD format')
    })

    test('name cannot be left empty', () => {
        expect(() => new Person('', 13-12-2000)).toThrowError('You must insert a name of at least 3 characters')
    })

    test('name must be at least 3 chars', () => {
        expect(() => new Person('Al', 13-12-2000)).toThrowError('You must insert a name of at least 3 characters')
    })

    test('name cannot be empty', () => {
        expect(() => new Person(undefined, 13-12-2000)).toThrowError('You must insert a name of at least 3 characters')
    })

    test('name cannot be null', () => {
        expect(() => new Person(null, 13-12-2000)).toThrowError('You must insert a name of at least 3 characters')
    })
    
})