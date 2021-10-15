const Person = require('./person')

class Passenger extends Person{
    
    constructor(name, passportNumber, seatNumber, bags){
        super(name,bags)

        let paramArray = [passportNumber, seatNumber];
        
        for (let i=0;i<paramArray.length; i++)
        {
            if (paramArray[i] == undefined){
                if(i === 0)
                throw new Error(`missing passport number`)

                if(i === 1)
                throw new Error(`missing seat number`)
            }

        }
        
        this.passportNumber = passportNumber
        this.seatNumber = seatNumber

        

    }



}

module.exports = Passenger
