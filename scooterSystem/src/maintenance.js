const Person = require('./person')
const ScooterApp = require("./scooterApp");


class Maintenance extends Person{
    constructor(name, dob, specialCode){
        super(name, dob)

        if (specialCode == undefined || specialCode.toString().length != 8 || 
            typeof specialCode !== 'number'){
            throw new Error ('Employee code must be of 8 digits and a number')
        }

        else{
            this.specialCode = specialCode
        }
        
    }

    
}

module.exports = Maintenance