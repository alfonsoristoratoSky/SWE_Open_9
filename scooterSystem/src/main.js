const ScooterApp = require('./scooterApp');
let app = ScooterApp;


//Register users
app.registerUser('Alfo', '1991-04-03', 4444333322221111, 1222, 432);


//Register user
app.registerUser('John', '1998-09-21', 4444333322221111, 1222, 432);
// prove that user is stored in users array
console.log(app.users)

//Register user
app.registerMaintenance('Mark', '1999-07-13', 12123344);
// prove that user is stored in users array
console.log(app.maintenance)

