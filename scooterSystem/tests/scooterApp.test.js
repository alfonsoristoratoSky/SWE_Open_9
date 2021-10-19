const ScooterApp = require('../src/scooterApp')

describe('Scooter app class', () => {


    test('maintenance special code must be included in Scooter app maintenanceCodes array', () => {
        expect(() => ScooterApp.registerMaintenance('Mark', '2000-09-09', 12122344)).toThrowError('Not a valid employee code')
    })

    test('register user needs all params', () => {
        expect(() => ScooterApp.registerUser('Mark', '2000-09-09')).toThrowError('Card must be a Visa or Mastercard, made of 16 digits')
    })

    test('register maintenance needs all params', () => {
        expect(() => ScooterApp.registerMaintenance('Mark', '2000-09-09')).toThrowError('Not a valid employee code')
    })

    test('user must be 18 yo', () => {
        expect(() => ScooterApp.registerUser('Mark', '2005-10-10', 4444333322221111, 1022, 344)).toThrowError('You must be 18 years old to use this app')
    })

    // test('insertLocation function can only show available locations', () => {
    //     let x = ScooterApp.insertLocation('dummy location');
    //     expect(console.log).toBeCalledWith(`We do not serve 'dummy location'`)
    // })



})

