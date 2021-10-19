const ScooterApp = require("./scooterApp");

class Scooter{
    constructor(){
        this.battery = 100;
        this.distanceTravelled = 0;
        this.id = idIncrement();
        this.isLocked = true;
        this.isUnderMaintenance = false;
        this.isCharged = true;


    }
    static idCounter = []

    timeToCharge(){

    };

    showAutonomy(){

    };

    alertLowBattery(){

    };

}

function idIncrement(){
    if (Scooter.idCounter.length === 0){
        Scooter.idCounter.push(1);
        return  1;
    }
    else{
        let tempId = Math.max(...Scooter.idCounter) + 1;
        Scooter.idCounter.push(tempId);
        return tempId;   
    }       
}

module.exports = Scooter