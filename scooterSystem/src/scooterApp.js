const Maintenance = require('./maintenance')
const User = require('./user')

class ScooterApp{
    
    static maintenanceCodes = [12345678, 23456789, 12123344]
    
    static users = []
    static userUsing;
    static errorUser = new Error('You must be an user in order to use the app, please register or log-in')

    static maintenance = []
    static idCounter = []

    // Array of charging stations
    static chargingStations =[]

    static locationSelected;

    static scooterInUse;

    static idIncrement(){
        if (ScooterApp.idCounter.length === 0){
            ScooterApp.idCounter.push(1);
            return  1;
        }
        else{
            let tempId = Math.max(...ScooterApp.idCounter) + 1;
            ScooterApp.idCounter.push(tempId);
            return tempId;   
        }       
    }

    static registerUser(name,dob, cardNumber, expiryDate, cvc){
        ScooterApp.userUsing = undefined;
        let id = ScooterApp.idIncrement()
        let user = new User(name,dob, cardNumber, expiryDate, cvc);

        //check for user to be 18 yo
        if (getAge(user.dob) < 18){
            throw new Error ('You must be 18 years old to use this app')
        }
        
        this.users.push({id, user})
        ScooterApp.userUsing = {id, user};
        console.log(`Your Login ID is: ${id}`)
    }

    static logout(){
        ScooterApp.userUsing = undefined;
    }

    static login(id){
        if(!ScooterApp.users.find(object => object.id === id)){
            throw new Error ('Please insert a valid id to login')
        }
        let user = ScooterApp.users.find(object => object.id === id)
        ScooterApp.userUsing = user;
        
    }

    static registerMaintenance(name, dob, specialCode){
        let id = ScooterApp.idIncrement()
        if (!ScooterApp.maintenanceCodes.includes(specialCode)){
            throw new Error ('Not a valid employee code')
        }
        else{
            let maintenance = new Maintenance(name, dob, specialCode);        
            this.maintenance.push({id, maintenance})
        }
    }

    static insertLocation(location){
        ScooterApp.locationSelected = undefined;
        if (ScooterApp.userUsing == undefined){
            throw ScooterApp.errorUser;
        }
        if (ScooterApp.chargingStations.find(
            (object) => object.location === location)){
            console.log(`There are ${ScooterApp.chargingStations.length} scooters at '${location}''`)
            ScooterApp.locationSelected = ScooterApp.chargingStations.find(
                (object) => object.location === location)
        }
        else{
            console.log(`We do not serve '${location}'`)
        }

    }

    static unlockScooter(){
        if (ScooterApp.userUsing == undefined){
            throw ScooterApp.errorUser;
        }
        if (ScooterApp.locationSelected == undefined){
            throw new Error('Go back to insert a valid location')
        }
        let scooterSelected = ScooterApp.chargingStations.find((object) => object.location === 
        ScooterApp.locationSelected.location).scootersInLocation[0];
        scooterSelected.isLocked = false;
        // remove scooter from specific charging station
        ScooterApp.chargingStations.find((object) => object.location === 
        ScooterApp.locationSelected.location).scootersInLocation.splice(0,1)


        
        preauthCard();
        ScooterApp.locationSelected = undefined;
        ScooterApp.scooterInUse = scooterSelected;
        console.log(`using scooter ${scooterSelected.id}`)

    }

    static returnScooter(){
        if (ScooterApp.userUsing == undefined){
            throw ScooterApp.errorUser;
        }
        if (ScooterApp.locationSelected == undefined){
            throw new Error('Go back to insert a valid location')
        }
        // push scooter back in array of scooters
        ScooterApp.chargingStations.find((object) => object.location === 
        ScooterApp.locationSelected.location).scootersInLocation.push(ScooterApp.scooterInUse)
        chargeCard()
        ScooterApp.scooterInUse = undefined;
        ScooterApp.locationSelected = undefined;
    }


}



function preauthCard(){
    console.log('Your card will be charged £1 for each km')
    console.log(`Card ${ScooterApp.userUsing.user.cardDetails['Card number']} of ${ScooterApp.userUsing.user.name} has been preauthorized for £50`)
}

function chargeCard(){
    let kmUsed = ScooterApp.scooterInUse.distanceTravelled
    console.log(`Card ${ScooterApp.userUsing.user.cardDetails['Card number']} of ${ScooterApp.userUsing.user.name} has been charged for £${kmUsed}, as you have travelled ${kmUsed} Kms`)
}

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}


module.exports = ScooterApp