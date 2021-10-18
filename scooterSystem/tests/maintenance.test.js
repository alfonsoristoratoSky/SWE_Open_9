const Maintenance = require('../src/maintenance')

describe('Maintenance class', () => {
    beforeAll(() => {
        maint1 = new Maintenance('Mark', '1999-05-28', 12345678)
    })

    test('maintenance person has a name', () => {
        expect(maint1.name).toBe('Mark')
    })

    test('maintenance special code must be a number', () => {
        expect(() => new Maintenance('Mark', '2000-09-09', '12345678')).toThrowError('Employee code must be of 8 digits and a number')
    })

    test('maintenance special code must be of 8 digits', () => {
        expect(() => new Maintenance('Mark', '2000-09-09', 234567890)).toThrowError('Employee code must be of 8 digits and a number')
    })

})