
const ScooterApp = require('../src/scooterApp')
const ChargingStation = require('../src/chargingStation')
const Scooter = require('../src/scooter');

describe('Scooter app class', () => {
    beforeAll(() => {
        ScooterApp.registerUser('Alf', '2000-01-01', 4444333322221111, 1022, 111)
        ScooterApp.registerMaintenance('Mark', '2000-09-09', 12123344)
        charg1 = new ChargingStation('City Center')
        charg2 = new ChargingStation('Beach')
        //create 4 scooters
        const scoot1 = new Scooter()
        const scoot2 = new Scooter()
        // add scooters to charging station
        charg2.addScooter(scoot1)
        charg2.addScooter(scoot2)
    })

    test('maintenance can register onto app', () => {
        expect(ScooterApp.maintenance).toEqual(expect.arrayContaining(
            [
                {
                    "id": 2,
                    "maintenance": {
                        "dob": "2000-09-09",
                        "name": "Mark",
                        "specialCode": 12123344
                    }
                }
            ]
        ))
    })

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

    test('app can register an user', () => {

        expect(ScooterApp.users).toEqual(expect.arrayContaining(
            [{
                "id": 1,
                "user":
                {
                    "cardDetails":
                        { "CVC": 111, "Card number": 4444333322221111, "Expiry date": 1022 },
                    "dob": "2000-01-01",
                    "name": "Alf",
                    "proofOfIdentity": {}

                }
            }]
        ))

    })

    test('user can logout and login, cannot login with invalid id', () => {
        ScooterApp.logout()
        expect(ScooterApp.userUsing).toBe(undefined);
        ScooterApp.login(1)
        expect(ScooterApp.userUsing).toEqual(expect.objectContaining(
            {
                "id": 1,
                "user":
                {
                    "cardDetails":
                        { "CVC": 111, "Card number": 4444333322221111, "Expiry date": 1022 },
                    "dob": "2000-01-01",
                    "name": "Alf",
                    "proofOfIdentity": {}

                }
            }
        ))
        expect(() => ScooterApp.login(5)).toThrowError('Please insert a valid id to login')

    })

    test('uinsert location requires a valid location to continue', () => {
        expect(console.log(ScooterApp.insertLocation('hills'))).toBe(console.log(`We do not serve 'hills'`))
        expect(console.log(ScooterApp.insertLocation('Beach'))).toBe(console.log(`There are 2 scooters at 'Beach'`))
    })

    test('if user is logged out, app will give an error and will not let you select location', () => {
        ScooterApp.logout()
        expect(() => ScooterApp.insertLocation('any')).toThrowError(ScooterApp.errorUser)
    })

    test('unlock scooter will not work if you are logged out or if you have not selected a valid location', () => {
        ScooterApp.logout()
        expect(() => ScooterApp.unlockScooter()).toThrowError(ScooterApp.errorUser)
        ScooterApp.login(1)
        expect(() => ScooterApp.unlockScooter()).toThrowError('Go back to insert a valid location')
    })

    test('unlock scooter will assign a scooter in use with certain params in order for it to run', () => {
        ScooterApp.insertLocation('Beach')
        ScooterApp.unlockScooter()
        expect(ScooterApp.scooterInUse).toEqual(expect.objectContaining(
            {
                "battery": 100,
                "distanceTravelled": 0,
                "id": 1,
                "isCharged": true,
                "isInUse": true,
                "isLocked": false,
                "isUnderMaintenance": false

            }
        ))
    })

    test('report broken throws errors as unlock scooter',()=>{
        ScooterApp.logout()
        expect(() => ScooterApp.reportBroken()).toThrowError(ScooterApp.errorUser)
        ScooterApp.login(1)
        expect(() => ScooterApp.reportBroken()).toThrowError('Go back to insert a valid location')
    })

    test('Scooter before report broken is NOT underMaintenance, also location is again unset as unlockScooter() unsets it',()=>{
        ScooterApp.insertLocation('Beach')
        ScooterApp.unlockScooter()
        expect(ScooterApp.scooterInUse.isUnderMaintenance).toBe(false)
        expect(() => ScooterApp.reportBroken()).toThrowError('Go back to insert a valid location')
        /**
         * we need to return at least 
         * one scooter otherwise the location 
         * won't have any left for future tests
         */
        ScooterApp.insertLocation('Beach')
        ScooterApp.returnScooter()
    })

    /**
     * continue with reportbroken, as it's async
     * will do it later
     */

    test('return scooter throws errors as unlock scooter and report broken',()=>{
        ScooterApp.logout()
        expect(() => ScooterApp.returnScooter()).toThrowError(ScooterApp.errorUser)
        ScooterApp.login(1)
        expect(() => ScooterApp.returnScooter()).toThrowError('Go back to insert a valid location')
    })

    test('Scooter before returnScooter is in use and is not locked, as they were changed by unlockScooter underMaintenance, also location is again unset as unlockScooter() unsets it',()=>{
        ScooterApp.insertLocation('Beach')
        ScooterApp.unlockScooter()
        expect(ScooterApp.scooterInUse.isInUse).toBe(true)
        expect(ScooterApp.scooterInUse.isLocked).toBe(false)
        expect(() => ScooterApp.returnScooter()).toThrowError('Go back to insert a valid location')
        // now insert the location to return the scooter
        ScooterApp.insertLocation('Beach')
        ScooterApp.returnScooter()
        /**
         * ScooterApp.scooterInUse is now undefined as per
         * returnScooter(), hence to find our scooter and read its properties
         * we need to locate it in the charging station
         */
        scooterReturned = ScooterApp.chargingStations[1].scootersInLocation[0]
        expect(scooterReturned.isInUse).toBe(false)
        expect(scooterReturned.isLocked).toBe(true)
    })



})

