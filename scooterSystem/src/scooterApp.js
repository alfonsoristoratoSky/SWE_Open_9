const Maintenance = require('./maintenance')
const User = require('./user')

class ScooterApp{
    
    static maintenanceCodes = [12345678, 23456789, 12123344]
    static chargingStations =[]
    static users = []
    static maintenance = []
    static idCounter = []

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
        let id = ScooterApp.idIncrement()
        let user = new User(name,dob, cardNumber, expiryDate, cvc);
        
        this.users.push({id, user})
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

    
}


module.exports = ScooterApp