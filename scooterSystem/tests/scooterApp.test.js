
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
        scoot1 = new Scooter()
        scoot2 = new Scooter()
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

    test('expiry date of the card registered along the user, needs to be higher than actual date', () => {
        expect(() => ScooterApp.registerUser('Mark', '2005-10-10', 4444333322221111, 1020, 344)).toThrowError('You need to use a card with a valid expiration date')
    })

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
         * this scooter otherwise the location 
         * won't have any left for future tests
         * note that previously we unlocked a scooter, scoot1
         * and never returned it - normally reportBroken would return the scooter
         * but it has been called in a callback function, hence not part of
         * execution
         */
        ScooterApp.insertLocation('Beach')
        // we are now returning scoot2
        ScooterApp.returnScooter()
    })

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

    test('ride a scooter for some time, so we can charge it', () => {
        jest.useFakeTimers()
        ScooterApp.insertLocation('Beach')
        ScooterApp.unlockScooter() // we are now unlocking the only scooter available

        let x = 0;
        while (x<5){
            scoot2.ride();
            x++
        }
        // advance to the end of the interval, 5 times as in the loop
        jest.advanceTimersByTime(1000)
        
        
        expect(scoot2.battery).toBe(95)
        expect(scoot2.distanceTravelled).toBe(0.32*5)

        jest.clearAllTimers()

    })
    test('charge a scooter', () => {
        jest.useFakeTimers()
        
        /**
         * we will now return the scooter
         * and as the battery is at 95, the ScooterApp.locationSelected.chargeScooter() method
         * inside returnScooter(),
         * which calls the chargingStation.chargeScooter(), will run
         */
        ScooterApp.insertLocation('Beach')
        ScooterApp.returnScooter()
        // we are now starting to charge, let's go ahead 2 seconds
        jest.advanceTimersByTime(2000)
        expect(scoot2.battery).toBe(97)
        // distance travelled resets only once charge is at 100
        expect(scoot2.distanceTravelled).toBe(0.32*5)

        // let's charge to completion, 3 more seconds
        jest.advanceTimersByTime(3000)
        expect(scoot2.battery).toBe(100)
        expect(scoot2.distanceTravelled).toBe(0)
        jest.clearAllTimers()

    })

    test('chargeScooter() can be called from a station, although not needed, but if called and there is no scooter to charge, it will throw an error', () =>{
        expect(() => charg2.chargeScooter()).toThrowError('There are no scooters to charge')
    })

    test('ride a scooter for some time, so we can reportBroekn and return it', () => {
        jest.useFakeTimers()
        ScooterApp.insertLocation('Beach')
        ScooterApp.unlockScooter() // we are now unlocking the only scooter available

        let x = 0;
        while (x<5){
            scoot2.ride();
            x++
        }
        // advance to the end of the interval, 5 times as in the loop
        jest.advanceTimersByTime(1000)
        
        
        expect(scoot2.battery).toBe(95)
        expect(scoot2.distanceTravelled).toBe(0.32*5)

        jest.clearAllTimers()

    })

    test('reportBroken(), which callMaintenance() and returnScooter() - callMainenance() also triggers repairScooter()', () => {
        jest.useFakeTimers()        
        /**
         * we will now reportBroken the scooter
         * which will mark the scooter under maintenance, 
         * call maintenance and trigger repairing
         */
        ScooterApp.insertLocation('Beach')
        ScooterApp.reportBroken()
        // we are now starting to charge and repair at the same time, let's go ahead 2 seconds
        jest.advanceTimersByTime(2000)
        expect(scoot2.battery).toBe(97)
        // distance travelled resets only once charge is at 100
        expect(scoot2.distanceTravelled).toBe(0.32*5)
        // scoot2 is under maintenance
        expect(scoot2.isUnderMaintenance).toBe(true)

        // let's charge to completion, 3 more seconds
        // but scooter still under maintenance, as it takes 20 secs to repair
        jest.advanceTimersByTime(3000)
        expect(scoot2.battery).toBe(100)
        expect(scoot2.distanceTravelled).toBe(0)
        expect(scoot2.isUnderMaintenance).toBe(true)

        // let's wait 15 more secs, for a total of 20 
        // to prove that scooter is repaired
        jest.advanceTimersByTime(15000)
        expect(scoot2.isUnderMaintenance).toBe(false)
        jest.clearAllTimers()

    })




})

