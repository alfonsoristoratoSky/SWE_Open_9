const ScooterApp = require("./scooterApp");

class Scooter {
    constructor() {
        this.battery = 100;
        this.distanceTravelled = 0;
        this.id = idIncrement();
        this.isLocked = true;
        this.isUnderMaintenance = false;
        this.isCharged = true;
        this.isInUse = false;


    }
    static idCounter = []

    ride() {
        if (this.isLocked === true) {
            throw new Error('You must unlock scooter via the app before using it')
        }


        let interv = setInterval(() => {
            this.distanceTravelled += 0.32;
            this.battery -= 1;
            console.log(`Scooter ${this.id} battery level: ` + this.battery)
            if (this.battery === 0 || this.isInUse === false) {
                clearInterval(interv)
            }
            /* istanbul ignore else */
        }

            , 1000); // ideally this is set to 10 sec, but for the sake of the 
        // programme running, it's set to 1 sec
    }

}

function idIncrement() {
    if (Scooter.idCounter.length === 0) {
        Scooter.idCounter.push(1);
        return 1;
    }
    else {
        let tempId = Math.max(...Scooter.idCounter) + 1;
        Scooter.idCounter.push(tempId);
        return tempId;
    }
}

module.exports = Scooter