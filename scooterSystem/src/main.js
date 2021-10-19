const ChargingStation = require('./chargingStation');
const Scooter = require('./scooter');
const ScooterApp = require('./scooterApp');
let app = ScooterApp;


//Register users
app.registerUser('Alfo', '1991-04-03', 4444333322221111, 1222, 432);
// prove that user is stored in users array
console.log('USERS')
console.log(app.users)

//Register maintenance
app.registerMaintenance('Mark', '1999-07-13', 12123344);
// prove that user is stored in users array
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
console.log('CHARGING STATIONS')
console.log(app.chargingStations)

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
scoot1.ride()
// charging stations now have one less scooter
console.log('CHARGING STATIONS UPDATED')
console.log(app.chargingStations)

// wait 10 secs so the scooter runs a bit :)
setTimeout(() => {
    // return scooter at different location
    app.insertLocation('Beach')
    app.returnScooter()
    // charging station BEACH now has one more scooter
    // as it's been returned
    console.log('CHARGING STATIONS UPDATED')
    console.log(app.chargingStations);
    // In order to prove that returned scooter has a lower battery
    // we need to select a location again, as otherwise the app won't work
    // the chargeScooter() of the charging stations sets this
    charg2.chargeScooter()
    console.log(app.chargingStations.find((object) => object.location === 
    ScooterApp.locationSelected.location).scootersInLocation);
  }, 10000);



