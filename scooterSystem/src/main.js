const ChargingStation = require('./chargingStation');
const Scooter = require('./scooter');
const ScooterApp = require('./scooterApp');
let app = ScooterApp;


//Register users
app.registerUser('Alfo', '1991-04-03', 4444333322221111, 1222, 432);
// prove that user is stored in users array
console.log(app.users)

//Register maintenance
app.registerMaintenance('Mark', '1999-07-13', 12123344);
// prove that user is stored in users array
console.log(app.maintenance)

//create 2 charging stations
const charg1 = new ChargingStation('City Center')
const charg2 = new ChargingStation('Beach')

// prove that charging stations are automatically added to scooter app
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
console.log(app.locationSelected)

// app uses an userUsing attribute to determine 
// who is using the app at the moment, with logout and login methods
// if logged out, only registerUser() or login() works
app.logout()
app.login(1)
app.unlockScooter()


