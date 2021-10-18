const ScooterApp = require('../src/scooterApp')

describe('Scooter app class', () => {


    test('maintenance special code must be included in Scooter app maintenanceCodes array', () => {
        expect(() => ScooterApp.registerMaintenance('Mark', '2000-09-09', 12122344)).toThrowError('Not a valid employee code')
    })

})

