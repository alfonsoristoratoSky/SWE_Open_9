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
        // 2 hrs max charging time = 0.83333% charging per minute, but for the sake of running the app in main.js
        // I used fictional time :)!
        console.log(`charging 1% of battery per second`)
        let toCharge = this.scootersInLocation.find(obj => obj.battery < 100)
        if (toCharge == undefined || toCharge == null){
            throw new Error ('There are no scooters to charge')
        }
        let interv = setInterval(() => {

            console.log(`Scooter ${toCharge.id} charging, current battery level: ${toCharge.battery}`)
            toCharge.battery +=1;
            if(toCharge.battery === 100){
                clearInterval(interv)
                toCharge.isCharged = true;
                toCharge.distanceTravelled = 0;
            }
        },1000)
        
    };



}

module.exports = ChargingStation