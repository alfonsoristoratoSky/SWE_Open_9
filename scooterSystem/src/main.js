const ChargingStation = require('./chargingStation');
const Scooter = require('./scooter');
const app = require('./scooterApp'); //ScooterApp was too long



//Register users
app.registerUser('Alfo', '1991-04-03', 4444333322221111, 1222, 432);
// prove that user is stored in users array
console.log('USERS')
console.log(app.users)

//Register maintenance
app.registerMaintenance('Mark', '1999-07-13', 12123344);
// prove that maintenance is stored in maintenance array
console.log('MAINTENANCE')
console.log(app.maintenance)

//create 2 charging stations
const charg1 = new ChargingStation('City Center')
const charg2 = new ChargingStation('Beach')

// prove that charging stations are automatically added to scooter app
console.log('CHARGING STATIONS')
console.log(app.chargingStations)

//create 4 scooters
const scoot1 = new Scooter()
const scoot2 = new Scooter()
const scoot3 = new Scooter()
const scoot4 = new Scooter()

// add scooters to charging station
charg1.addScooter(scoot1)
charg1.addScooter(scoot2)
charg2.addScooter(scoot3)
charg2.addScooter(scoot4)

// prove that charging stations are automatically 
// added to scooter app and now contain scooters
// console.log('CHARGING STATIONS')
// console.log(app.chargingStations)

// user can select a location and the console will say 
// whether or not it exists and how many scooters there are
app.insertLocation('Beach')
app.insertLocation('London Bridge')
app.insertLocation('City Center')

// insertLocation() returns a location selected object, 
// that references the location the user wants to use
// it also resets locationSelected to undefined to avoid
// having more than 1 location stored as an object
console.log('LOCATION SELECTED')
console.log(app.locationSelected)

// app uses an userUsing attribute to determine 
// who is using the app at the moment, with logout and login methods
// if logged out, only registerUser() or login() works
// unlockScooter also sets locationSelected to undefined so
// that user needs to re-insert the location
// in order to return the scooter once finished
app.logout()
app.login(1)
app.unlockScooter()

app.scooterInUse.ride()
// charging stations now have one less scooter
console.log('CHARGING STATIONS UPDATED')
console.log(app.chargingStations)

//#region Commented out as code below mimics returnScooter()

// // wait 10 secs so the scooter runs a bit :)
// setTimeout(() => {
//     // return scooter at different location
//     app.insertLocation('Beach')
//     app.returnScooter()

//     // comment out first timeout and uncomment 
//     // the below to see the logic behind a broken scooter


//     // charging station BEACH now has one more scooter
//     // as it's been returned
//     console.log('CHARGING STATIONS UPDATED')
//     console.log(app.chargingStations);
//     // In order to prove that returned scooter has a lower battery
//     // we need to select a location again, as otherwise the app won't work
//     // the chargeScooter() of the charging stations sets this
//     charg2.chargeScooter()

//     // wait 11 secs so the scooter charges:)
//     setTimeout(() => {
//         console.log(app.chargingStations.find((object) => object.location ===
//             ScooterApp.locationSelected.location).scootersInLocation);

//     }, 11000)


// }, 10000);

//#endregion

// uncomment out first timeout and comment out
// the below to see the logic behind a non broken scooter returned
// I left this on as reportBroken() calls returnScooter() from within
// wait 10 secs so the scooter runs a bit :)
setTimeout(() => {
    // return scooter at different location
    app.insertLocation('Beach')
    app.reportBroken()

    // charging station BEACH now has one more scooter
    // as it's been returned
    console.log('CHARGING STATIONS UPDATED')
    console.log(app.chargingStations);
    // In order to prove that returned scooter has a lower battery
    // we need to select a location again, as otherwise the app won't work
    // 
    app.insertLocation('Beach')
    console.log('PROVES THAT SCOOTER RETURNED VIA reportBroken() HAS A LOWER BATTERY AND IS UNDER MAINTENANCE')
    console.log(app.chargingStations.find((object) => object.location === 
    app.locationSelected.location).scootersInLocation);


    // wait 20 secs so the scooter charges:)
    setTimeout(() => {
        console.log('PROVES THAT SCOOTER HAS BEEN REPAIRED')
        console.log(app.chargingStations.find((object) => object.location === 
        app.locationSelected.location).scootersInLocation);


    }, 21000)
    

  }, 10000);


