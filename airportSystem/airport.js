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
        this.planesTakingOff.push(plane)
    }

    comingIn(plane){
        this.planesArriving.push(plane)
    }
}

module.exports = Airport