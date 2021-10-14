const Plane = require('./plane')

class Airport{
    constructor(name){
        if (name == undefined){
            throw new Error ('missing name')
        }
        else{
            this.name = name
        }

        this.planesTakingOff = [];
        this.planesArriving = [];       

    }
    takingOff(plane){
        if (typeof plane != typeof new Plane('boeing')) {
            throw new Error(`must be an instance of Plane`)
        }
        else this.planesTakingOff.push(plane);
    }

    comingIn(plane){
        if (typeof plane != typeof new Plane('boeing')) {
            throw new Error(`must be an instance of Plane`)
        }
        else this.planesArriving.push(plane);
    }
}

module.exports = Airport