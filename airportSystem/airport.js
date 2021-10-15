const Plane = require('./plane')

class Airport{
    static airports = [];
    static idCounter = [];
    
    constructor(name){
        if (name == undefined){
            throw new Error ('missing name')
        }
        else{
            this.name = name
        }
        
        this.planesTakingOff = [];
        this.planesArriving = []; 
        Airport.airports.push(this);  
        this.id = Airport.idIncrement();


    }
    
    takingOff(plane){
        if (typeof plane != typeof new Plane('boeing')) {
            throw new Error(`must be an instance of Plane`)
        }
        else this.planesTakingOff.push(plane);
        return plane.fly(this.name);
            
        
    }

    comingIn(plane){
        if (typeof plane != typeof new Plane('boeing')) {
            throw new Error(`must be an instance of Plane`)
        }
        else this.planesArriving.push(plane);
    }

    static idIncrement(){
        if (Airport.idCounter.length === 0){
            Airport.idCounter.push(1);
            return  1;
        }
        
        let tempId = Math.max(...Airport.idCounter) + 1;
        Airport.idCounter.push(tempId);
        return tempId;     
    }


    



}

module.exports = Airport