const Scooter = require("./scooter");
const ScooterApp = require("./scooterApp");

class ChargingStation{
    constructor(location){
        this.location = location;
        this.scootersInLocation = [];

        // adds a newly cretaed station to the 
        // scooter app array of charging stations
        ScooterApp.chargingStations.push(this);
    }

    addScooter(scooter){
        if(typeof scooter != typeof new Scooter()){
            throw new Error('Can only add instances of scooter')
        }
        else{
            this.scootersInLocation.push(scooter)
        }
    }
    chargeScooter(){

    };

    requestMaintenance(){

    };

}

module.exports = ChargingStation